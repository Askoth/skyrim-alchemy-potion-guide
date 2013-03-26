/**
 * Parses the crazy html from the raw data i got
 * http://www.uesp.net/wiki/Skyrim:Ingredients
 * @param  jQuery tr array
 * @return custom array with all the info I need
 */
function parseDataList (dataList) {

	var dataObject = {};

	$.each(dataList, function (i, dataItem) {

		var $dataItem = $(dataItem),
			$tds = $dataItem.find('td'),

            name = parseName($tds.eq(0).text());

        dataObject[name] = {
            name: parseName($tds.eq(0).text()),
			expansion: parseExpansion($tds.eq(0).text()),
			id: '',
			image: '',
			getFrom: cleanBreakLine($tds.eq(7).text()),
			effects: [
                cleanBreakLine($tds.eq(1).text()),
                cleanBreakLine($tds.eq(2).text()),
                cleanBreakLine($tds.eq(3).text()),
                cleanBreakLine($tds.eq(4).text())
            ]
		}

	})

	return dataObject;
}

function parseEffects (objIngredients) {

    var ingredientList = Object.keys(objIngredients),
        effectsList = {};

    $.each(ingredientList, function (i, ingredientName) {

        var ingredientObj = objIngredients[ingredientName];

        $.each(ingredientObj.effects, function (i, effect){

            if (!effectsList[effect]) {
                effectsList[effect] = [];
            }

            effectsList[effect].push(ingredientName);

        });


    });


    return effectsList;
}

function cleanBreakLine (str) {
    return $.trim(str.replace(/\n/g, ''))
}

function parseName (name) {
    return $.trim(name.replace(/\*|\n/g, ''))
}

function parseExpansion (str) {
    var expansions = [
        'vanilla',
        'dawnguard',
        'hearthfire',
        'dragonborn'
    ];

    str = str.replace(/[^\*]/g, '')

    return expansions[str.length];
}

