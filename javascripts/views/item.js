var ItemView = Backbone.View.extend({
        initialize: function (options) {
            this.mainView = options.mainView;
            this.ingredient = options.ingredient;
            this.column = options.column;

            this.listenTo(this.mainView, 'closeAll', this.close)
        },
        render: function () {
        },
        events: {
            'click .div-button': 'openCheckboxes'
        },
        openCheckboxes: function () {
            this.$el.addClass('active');
            this.trigger('active', {
                el: this,
                column: this.column
            });
        },
        close: function (options) {
            if (options.el != this && options.column == this.column) {
                this.$el.removeClass('active');
            }
        }

    });