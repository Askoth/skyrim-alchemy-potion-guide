
$.when(
    $.ajax('javascripts/parsers/wiki-rawdata.html'),
    $.ajax('javascripts/parsers/wiki-parser.js')

).then(function(rawData, parser){ 
    var dataList = $(rawData[0]).find('tbody tr'),
        objIngredients = parseDataList(dataList),
        objEffects = parseEffects(objIngredients),
        objAll = {
            ingredients: objIngredients,
            effects: objEffects
        };

    $('#show-ingredients').on('click', showIngredients);
    $('#show-effects').on('click', showEffects);
    $('#show-all').on('click', showAll);

    function showIngredients () {
        $('#json-test').html(JSON.stringify(objIngredients, null, '\t'));
    }

    function showEffects () {
        $('#json-test').html(JSON.stringify(objEffects, null, '\t'));
    }

    function showAll () {
        $('#json-test').html(JSON.stringify(objAll, null, '\t'));
    }

    showAll();
});
