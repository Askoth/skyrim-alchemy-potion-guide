var ResultsView = Backbone.View.extend({

        liTemplate: _.template($('#tpl-potion-item').html()),

        initialize: function (options) {
            this.mainView = options.mainView;
            this.ingredientsCollection = options.ingredientsCollection;

            this.listenTo(this.mainView, 'result:update', this.render)
        },
        render: function (options) {

            var selectedIngredients = this.$el.find('#selected-ingredients'),
                resultsDesired = this.$el.find('#results-desired'),
                resultsCollateral = this.$el.find('#results-collateral'),

                sanitized = this.sanitize(options);

            selectedIngredients.html(this.applyTemplate(sanitized.ingredients));
            resultsDesired     .html(this.applyTemplate(sanitized.effects));
            resultsCollateral  .html(this.applyTemplate(sanitized.collateral));

        },
        applyTemplate: function (collection) {

            return this.liTemplate({result: collection});

        },

        sanitize: function (options) {

            var count = {},
                selectedEffects = [],
                selectedIngredients = {},
                result = {
                    ingredients: [],
                    effects: [],
                    collateral: []
                };

            //get selected effects and ingredients
            _.forIn(options, function (selection, column) {

                //ingredients will always show as long as there are effects selected
                if (selection.effects.length > 0) {
                    result.ingredients.push(selection.ingredient);

                    selectedIngredients[selection.ingredient] = true;
                    selectedEffects = selectedEffects.concat(selection.effects);
                }
            })

            //search ingredients for selected effects and count if they match twice
            //any effect that also matches twice but was not intended will go to collateral array

            var selectedIngredients = _.filter(this.ingredientsCollection.toJSON(), function (ingredient) {
                    if (selectedIngredients[ingredient.name]) {
                        return true;
                    }
                    return false;
                });

            //count how many matches all the effects have
            _.each(selectedIngredients, function (item) {
                _.each(item.effects, function (effect) {
                    if (!count[effect]) {
                        count[effect] = 1;
                    } else {
                        count[effect]++;
                    }

                })
            });

            //pushes selected effects
            _.each(selectedEffects, function (effect) {
                if (count[effect] > 1) {
                    result.effects.push(effect);
                    count[effect] = 0;
                }
            });

            _.forIn(count, function (amount, effect) {
                if (amount > 1) {
                    result.collateral.push(effect);
                    count[effect] = 0;
                }
            });

            return result;
        }

    });