
function startIngredientsCollection (alchemyData) {
    var IngredientsCollection = Backbone.Collection.extend({
            model: IngredientModel
        }),
        ingredientsCollection = new IngredientsCollection;

    ingredientsCollection.add(alchemyData.ingredients);

    return ingredientsCollection;
}