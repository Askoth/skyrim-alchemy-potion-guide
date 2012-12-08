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

	htmlTemplate.find('[tplRepeat]').each(function (iterationOfRepeats, repeat) {
		var repeatElement = $(repeat),
			tplRepeatData = repeatElement.attr('tplRepeat'),
			arrayRef = $.trim(tplRepeatData.replace(/.*in\s+/, '')),
			itemRef = $.trim(tplRepeatData.replace(/(\w+).*/, '$1')),
			frag = document.createDocumentFragment();

		$.each(data[arrayRef], function (i, dataItem) {

			var content = repeatElement.html(),
				scope = {},
				repeatClone = $.clone(repeat);

			scope[itemRef] = dataItem;

			repeatClone.innerHTML = replaceStrings(content, scope);

			frag.appendChild(repeatClone);

		})

		$(this).parent().html(frag);

	})

// console.log(htmlTemplate.html());

	return $(htmlTemplate);

}

/**
 * replace the strings inside the template
 * @param  string content the html
 * @param  object scope   the values of properties to be found in the HTML and be replaced
 * @return string
 */
function replaceStrings (content, scope) {

	var capturedStrings = content.match(/{{.*}}/)[0];

	//no string to be replace
	if (capturedStrings === null) {
		return content;
	}

	var objName = capturedStrings.match(/\b[A-z0-9]+/)[0],
		properties = capturedStrings
			.substring(
				capturedStrings.indexOf(objName)
			)
			.match(/\.([A-z0-9]+)/) || [],
		value = getPropertyValue(scope[objName], properties.slice(-1));

	return content.replace(capturedStrings, value);

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

