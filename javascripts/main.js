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
					regexp = new RegExp('(' + markText + ')', 'gi');



				text = text.replace(regexp, '<strong>$1</strong>')

				$(this).html(text)

			});
		}

		$('#results').html(output);
	}


	$('#search').keyup(function () {

		var self = $(this),
			matchVal = self.val(),
			dataCopy = $.extend({}, dataArray, true);

		dataCopy = $.map(dataCopy, function (dataItem, i) {

			if (
				indexOfValue(dataItem.name, matchVal) != -1 ||
				indexOfValueInArray(dataItem.effects, 'name', matchVal) != -1
			) {
				return dataItem;
			}
			return null
		});

		render(dataCopy, matchVal);
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

});








