var MainView = Backbone.View.extend({
        el: document.getElementById('lists-wrap'),
        template: _.template($('#tpl-list').html()),
        subview: {
            view: ItemView,
            template: _.template($('#tpl-item').html())
        },
        initialize: function (options) {
            console.log('MainView Initialized!');

            this.ingredientsCollection = options.ingredientsCollection;
            this.effectsCollection = options.effectsCollection;
        },
        render: function () {
            var $html = $(this.template()),
                collection = this.ingredientsCollection.toJSON(),
                subview = this.subview,
                mainView = this,

                $el = this.$el;

            $el.append($html);

            var listsAmount = $el.find('ul').length;

            for (var i = 0; i < listsAmount; i++) {

                _.each(collection, function (ingredient) {

                    var $tpl = $(subview.template({ingredient: ingredient})),
                        ulIdNum = i + 1;

                    $el.find('#ingredient-list-' + ulIdNum).append($tpl);

                    var view = new subview.view({
                        mainView: mainView,
                        ingredient: ingredient,
                        column: ulIdNum
                    });

                    view.setElement($tpl)

                    mainView.listenTo(view, 'active', mainView.closeAll)

                });
            }

        },
        closeAll: function (view) {
            this.trigger('closeAll', view)
        }
    });