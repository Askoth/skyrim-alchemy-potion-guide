var MainView = Backbone.View.extend({
        el: document.getElementById('app-wrap'),
        template: _.template($('#tpl-list').html()),
        subview: {
            list: {
                view: ItemView,
                template: _.template($('#tpl-item').html())
            },
            results: {
                view: ResultsView,
                template: _.template($.trim($('#tpl-potion').html()))
            }
        },
        initialize: function (options) {
            this.ingredientsCollection = options.ingredientsCollection;
            this.effectsCollection = options.effectsCollection;
        },
        render: function () {
            var $html = $(this.template()),
                collection = this.ingredientsCollection.toJSON(),
                subviewList = this.subview.list,
                subviewResults = this.subview.results,
                mainView = this,

                $el = this.$el;
                $listsWrap = $el.find('#lists-wrap');

            $listsWrap.append($html);

            var listsAmount = $listsWrap.find('ul').length;

            for (var i = 0; i < listsAmount; i++) {

                _.each(collection, function (ingredient) {

                    var $tpl = $(subviewList.template({ingredient: ingredient})),
                        ulIdNum = i + 1;

                    $listsWrap.find('#ingredient-list-' + ulIdNum).append($tpl);

                    var view = new subviewList.view({
                        mainView: mainView,
                        ingredient: ingredient,
                        column: ulIdNum
                    });

                    view.setElement($tpl);
                    //hide all unused views to show things as the user navigates
                    view.trigger('hide');

                    mainView.listenTo(view, 'active', mainView.closeAll);
                    mainView.listenTo(view, 'filter', mainView.filter);
                    mainView.listenTo(view, 'column:inactivate', mainView.inactivateColumn);

                });
            }

            $el.append(subviewResults.template());

        },
        inactivateColumn: function (options) {
            this.trigger('inactivateColumn', options)
        },
        closeAll: function (view) {
            this.trigger('closeAll', view)
        },
        filter: function (options) {

            if (!this.query) {
                this.query = {};
            }

            var eventName,
                self = this;

            _.forIn(options, function (selection, column) {

                if (!self.query[column] || self.query[column] && !_.isEqual(self.query[column], selection)) {

                    self.query[column] = selection;

                    eventName = 'show:column-' + (parseInt(column, 10) + 1);

                    self.trigger(eventName, self.query);

                }
            });

        }
    });