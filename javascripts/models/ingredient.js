var IngredientModel = Backbone.Model.extend({
        initialize: function () {

        },
        defaults: {
            "name": "",
            "expansion": "",
            "image": "",
            "getFrom": "",
            "effects": []
        },
        validate: function () {
            console.log('[validation]', arguments);
        }
    });