/**
 * handles html templates
 * @param  html template template to change
 * @param  object data   the object wiht instructions to apply on the template
 * @return jQuery html object
 */
function template (template, data) {
	//first handles template attributes
	//then parses template string marks

	var htmlTemplate = $(template);

	htmlTemplate.find('[tplRepeat]').each(function (iterationOfRepeats, repeatItem) {
		var repeatElement = $(repeatItem),
			tplRepeatData = repeatElement.attr('tplRepeat'),
			arrayRef = getArrayRef(tplRepeatData),
			itemRef = getItemRef(tplRepeatData);

		//arrayRef is not a reference do a main scope property
		//it is probably a loop inside a loop and should be treated inside the main one
		if (!data[arrayRef]) {
			return;
		}

		$(this).parent().html(
			generateLoopHtml(data, repeatItem, itemRef, arrayRef)
		);

	})

// console.log(htmlTemplate.html());

	return $(htmlTemplate);

}


/**
 * Parses the loop string: <item> in <array> and return the <array> name
 * @param  string str <item> in <array>
 * @return string <array> name
 */
function getArrayRef(str) {
	return $.trim(str.replace(/.*in\s+/, ''));
}

/**
 * Parses the loop string: <item> in <array> and return the <item> name
 * @param  string str <item> in <array>
 * @return string <item>
 */
function getItemRef(str) {
	return $.trim(str.replace(/(\w+).*/, '$1'));
}


/**
 * generate the html that will be repeated and populates it also deals with repeaters that will use the items of the first repeater loop
 * @param  object arrayRef reference to the data from main scope
 * @param  [html object] repeatItem each pieace of html from the repeat loop
 * @param  string itemRef the reference for each item of the loop from the template
 * @return [html object] fragment
 */
function generateLoopHtml(data, repeatItem, itemRef, arrayRef) {

	var frag = document.createDocumentFragment(),
		dataArrayRef = getPropertyValue(data, arrayRef.split('.'));

	$.each(dataArrayRef, function (i, dataItem) {
		var content = repeatItem.innerHTML,
			scope = {},
			repeatClone = $.clone(repeatItem);

		scope[itemRef] = dataItem;

		repeatClone.innerHTML = replaceStrings(content, scope);

		//in case there is a loop inside the loop and it uses the template var of the parent loop
		var $repeatClone = $(repeatClone),
			childNodeRepeat = $repeatClone.find('[tplRepeat]');
			childFrag = document.createDocumentFragment();

		if (childNodeRepeat.length > 0) {

			var childItemRef = getItemRef(childNodeRepeat.attr('tplRepeat')),
				childArrayRef = getArrayRef(childNodeRepeat.attr('tplRepeat'));

			//if the below are the same, the child loop uses the itemRef to loop inside it
			if (itemRef == childArrayRef.replace(/\..*/, '')) {
				//childArrayRef don't need to have the name of the object, only the name of the properties that will be found in scope[itemRef]
				childArrayRef = childArrayRef.replace(/[^\.]+\./, '');


				childNodeRepeat.replaceWith(
					generateLoopHtml(scope[itemRef], childNodeRepeat.get(0), childItemRef, childArrayRef)
				);
			}

		}


		frag.appendChild(repeatClone);
	})

	return frag;
}

/**
 * replace the strings inside the template
 * @param  string content the html
 * @param  object scope   the values of properties to be found in the HTML and be replaced
 * @return string
 */
function replaceStrings (content, scope) {

	var capturedStrings = content.match(/{{[^}}]+}}/g);

	//no string to be replace
	if (capturedStrings === null) {
		return content;
	}

	$.each(capturedStrings, function (i, capString) {

		var objName = capString.match(/\b[A-z0-9]+/)[0],
			properties = capString
				.substring(
					capString.indexOf(objName)
				)
				.match(/\.([A-z0-9]+)/) || [],
			value;

		//the objName may be from another scope or loop inside the current one
		if (!scope[objName]) {
			return
		}

		value = getPropertyValue(scope[objName], properties.slice(-1));

		//value is undefined when the objName isn't found on this scope
		if (value) {
			content = content.replace(capString, value);
		}

	});

	return content;

}

/**
 * Go through all levels of property of the object until it finds the value
 * @param  object obj  the object that has the value
 * @param  array prop all the strings of properties that need to go through
 * @return the value of the object property
 */
function getPropertyValue (obj, prop) {

	//easier cases
	if (prop.length < 1) {
		return obj;
	} else if (prop.length < 2) {
		return obj[prop[0]];
	}

	//here, there be dragons! ... or not ...
	var result = obj;

	for (var i = 0; i < prop.length; i++) {
		result = result[prop[i]]
	}

	return result;

}

