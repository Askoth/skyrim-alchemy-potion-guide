var ItemView = Backbone.View.extend({
        initialize: function (options) {
            this.mainView = options.mainView;
            this.ingredient = options.ingredient;
            this.column = options.column;

            this.$el.hide();

            this.listenTo(this.mainView, 'closeAll', this.close)
            this.listenTo(this.mainView, 'show:column-' + this.column, this.filterViews)

            if (this.column > 1) {
                this.on('hide', this.hide);
            }
        },
        render: function () {
        },
        events: {
            'click .div-button': 'openCheckboxes',
            'click .chk-item-effects': 'filterEffects'
        },
        openCheckboxes: function () {
            this.$el.addClass('active');
            this.$el.find('[type=checkbox]').attr('checked', 'checked');
            this.trigger('active', {
                el: this,
                column: this.column
            });

            this.filterEffects();
        },
        close: function (options) {
            if (options.el != this && options.column == this.column) {
                this.$el.removeClass('active');
            }
        },
        hide: function () {
            this.$el.hide();
        },
        filterEffects: function () {
            if (!this.$el.hasClass('active')) {
                return;
            };

            var effects = [];

            this.$el.find('[type=checkbox]:checked').each(function () {
                effects.push($(this).data('effect'));
            });

            this.trigger('filter', {
                ingredient: this.$el.data('ingredient'),
                effects: effects,
                column: this.column
            });

        },
        filterViews: function (options) {
            if (options.effects.length < 1) {
                //no effect is matching
                this.$el.hide();
                return;
            }

            if (this.ingredient.name == options.ingredient) {
                //same item should now show
                this.$el.hide();
                return;
            }

            var result = _.intersection(this.ingredient.effects, options.effects);

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