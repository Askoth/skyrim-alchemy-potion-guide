
function startEffectsCollection (alchemyData) {
    var EffectsModel = Backbone.Model.extend({
        initialize: function () {

        },
        defaults: {
            "effect": "",
            "ingredients": []
        },
        validate: function () {
            console.log('[validation]', arguments);
        }
    });

    var EffectsCollection = Backbone.Collection.extend({
            model: EffectsModel
        }),
        effectsCollection = new EffectsCollection;

    effectsCollection.add(alchemyData.effects);

    return effectsCollection;
}