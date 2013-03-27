var ItemView = Backbone.View.extend({
        initialize: function (options) {
            this.mainView = options.mainView;

            this.listenTo(this.mainView, 'closeAll', this.close)
        },
        render: function () {
        },
        events: {
            'click .div-button': 'openCheckboxes'
        },
        openCheckboxes: function () {
            this.$el.addClass('active');
            this.trigger('active', this);
        },
        close: function (view) {
            if (view != this) {
                this.$el.removeClass('active');
            }
        }

    });