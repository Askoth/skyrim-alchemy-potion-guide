
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
    $('#show-all-arr').on('click', showAllArr);

    function showIngredients () {
        $('#json-test').html(JSON.stringify(objIngredients, null, '\t'));
    }

    function showEffects () {
        $('#json-test').html(JSON.stringify(objEffects, null, '\t'));
    }

    function showAll () {
        $('#json-test').html(JSON.stringify(objAll, null, '\t'));
    }

    function showAllArr () {

        var ingredientsArr = [],
            effectsArr = [];

        $.each(objAll.ingredients, function (key, value) {

            delete value.id;

            ingredientsArr.push(value);
        });

        $.each(objAll.effects, function (key, value) {
            effectsArr.push({
                effect: key,
                ingredients: value
            });
        });

        $('#json-test').html(JSON.stringify({
            ingredients: ingredientsArr,
            effects: effectsArr
        }, null, '\t'));
    }

    showAllArr();
});
