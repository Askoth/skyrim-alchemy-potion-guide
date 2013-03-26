/**
 * Parses the crazy html from the raw data i got
 * http://www.uesp.net/wiki/Skyrim:Ingredients
 * @param  jQuery tr array
 * @return custom array with all the info I need
 */
function parseDataList (dataList) {

	var dataArray = [];

	$.each(dataList, function (i, dataItem) {

		var $dataItem = $(dataItem),
			$tds = $dataItem.find('td');


		if (i%2 == 0) {
			dataArray.push({
				name: $tds.eq(1).find('a').eq(0).text(),
				expansion: $tds.eq(1).find('a').not(':first').text(),
				id: $tds.eq(1).find('small').text(),
				image: $tds.eq(0).find('img').attr('src'),
				getFrom: $tds.eq(2).text(),
				effects: []
			})

		} else {

			var dataArrayLast = dataArray.length - 1;

			$tds.each(function (j, td) {

				var $td = $(td),
					effect = {
						isPositive: false,
						name: ''
					};

				effect.isPositive = $td.hasClass('EffectPos');
				effect.name;

				$td.find('a').each(function (k, a) {

					var $a = $(a);

					//this anchor may be the first, second or third element
					if (/Skyrim|skyrim/.test($a.attr('title'))) {
						effect.name = $a.text();
					}

				});

				if (!effect.name) {
					return
				}

				dataArray[dataArrayLast].effects.push(effect);

			});

		}

	})

	return dataArray;
}