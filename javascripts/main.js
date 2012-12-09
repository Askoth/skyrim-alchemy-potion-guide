$.when(
	// $.ajax('javascripts/templates/rawdata.html'),
	$.ajax('javascripts/data.json'),
	$.ajax('javascripts/templates/list.html')
).then(function(rawData, listTemplate){ 
	// var dataList = $(rawData[0]).find('tbody tr'),
	var output = rawData,
		dataArray = rawData[0];

	// dataArray = parseDataList(dataList);
	render(dataArray);

	function render (data, markText) {
		output = template(listTemplate[0], {listItems: data});

		if (markText && markText.length > 0) {

			output.find('.mark-text').each(function (html) {

				var text = $(this).html(),
					regexp;
				
				$.each(markText, function (i, mark) {

					regexp = new RegExp('(' + mark + ')', 'gi');

					text = text.replace(regexp, '<strong>$1</strong>')
				})

				$(this).html(text)

			});
		}

		$('#results').html(output);
	}


	$('#search').keyup(function () {

		var self = $(this),
			matchValues = self.val(),
			dataCopy = $.extend({}, dataArray, true),
			valuesToMarkOnHtml = trimArray(matchValues.match(/[^\||\&]+/g));

		matchValues = matchValues.match(/[^\|]+/g);

		//trim
		matchValues = trimArray(matchValues);

		dataCopy = $.map(dataCopy, function (dataItem, i) {

			var result = null;

			result = searchForValue(dataItem, matchValues);
			
			return result;
		});

		render(dataCopy, valuesToMarkOnHtml);
	})

	function indexOfValue (str, val) {
		return str.toLowerCase().indexOf(val.toLowerCase());
	}

	function indexOfValueInArray (array, prop, val) {

		var index = -1;

		$.each(array, function (i, item) {
			var thisIndex = indexOfValue(item[prop], val);
			if (thisIndex != -1) {
				index = thisIndex;
			}
		});

		return index;
	}

	function trimArray (arr) {
		return $.map(arr, function (match) {
			return $.trim(match)
		});
	}

	function searchForValue (dataItem, matchValues) {

		var result = null;

		$.each(matchValues, function (i, matchVal) {
			if (matchVal.indexOf('&') != -1) {

				result = searchAND(dataItem, matchVal);

			} else {

				result = searchOR(dataItem, matchVal);
		
			}

		})

		return result;
	}


	function searchOR (dataItem, matchVal) {
		var result = null;
		if (
			indexOfValue(dataItem.name, matchVal) != -1 ||
			indexOfValueInArray(dataItem.effects, 'name', matchVal) != -1
		) {
			result = dataItem;
		}		
		return result;
	}

	function searchAND (dataItem, matchValues) {
		var result = dataItem,
			matchValArr = trimArray(matchValues.match(/[^\&]+/g));

		$.each(matchValArr, function (i, matchVal) {

			//if matchVal cannot be found, return null
			if (
				indexOfValue(dataItem.name, matchVal) == -1 &&
				indexOfValueInArray(dataItem.effects, 'name', matchVal) == -1
			) {
				result = null;
			}
		});

		return result;
	}

});








