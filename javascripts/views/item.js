var ItemView = Backbone.View.extend({
        initialize: function (options) {
            this.mainView = options.mainView;
            this.ingredient = options.ingredient;
            this.column = options.column;

            this.$el.hide();

            this.listenTo(this.mainView, 'inactivateColumn', this.inactivateItem);
            this.listenTo(this.mainView, 'closeAll', this.close);
            this.listenTo(this.mainView, 'show:column-' + this.column, this.filterViews);

            if (this.column > 1) {
                this.on('hide', this.hide);
            }
        },
        render: function () {
        },
        events: {
            'click .chk-item-effects': 'activateItem'
        },
        close: function (options) {
            if (options.el != this && options.column == this.column) {
                this.$el.removeClass('active');
            }
        },
        hide: function () {
            this.$el.hide();
        },
        inactivateItem: function (options) {
            if (options.el != this && options.column == this.column) {
                this.$el.removeClass('active');
                this.$el.find('[type=checkbox]:checked:not(:disabled)').removeAttr('checked')
            }
        },
        activateItem: function () {

            this.trigger('column:inactivate', {
                column: this.column,
                el: this
            });

            this.filterEffects();
        },
        filterEffects: function () {

            var effects = [];

            this.$el.find('[type=checkbox]:checked:not(:disabled)').each(function () {
                effects.push($(this).data('effect'));
            });

            if (effects.length > 0) {
                this.$el.addClass('active');
            }

            var query = {};

            query[this.column] = {
                ingredient: this.$el.data('ingredient'),
                effects: effects
            }

            this.trigger('filter', query);

        },
        filterViews: function (options) {


            var shouldHide = false;

            if (!options[this.column - 1] || options[this.column - 1].effects.length < 1) {
                //no effect is matching
                //should match effects only from the previous column
                shouldHide = true;
            }

            var thisName = this.ingredient.name,
                thisColumn = this.column;

            _.forIn(options, function (selection, column) {

                if (column < thisColumn) {


                    if (thisName == selection.ingredient) {
                        //same item should not show
                        shouldHide = true;
                    }
                }


            });

            if (shouldHide) {
                this.$el.hide();
                return;
            }


            var result = _.intersection(this.ingredient.effects, options[this.column - 1].effects);

            if (result.length > 0) {

                this.$el.find('.chk-item-effects').each(function () {
                    var self = $(this);

                    if (_.indexOf(result, self.data('effect')) != -1) {
                        self.attr({
                            'disabled': 'disabled',
                            'checked': 'checked'
                        });
                    } else {
                        self.removeAttr('disabled').removeAttr('checked');
                    };
                });

                this.$el.show();
            } else {
                this.$el.hide();
            }

        }

    });