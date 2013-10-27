
define([
  'backbone',
  './posts'
], function(
  Backbone,
  Posts
) {

  var Export = Backbone.View.extend({

    initialize: function() {
      this.collection = new Posts;
      this.listenTo(this.collection, 'add', this.addItems);
      this.collection.fetch();
    },

    render: function() {
      this.$el.html('<p>Hello</p>');
      return this;
    },

    addItems: function() {
      var markup = '';

      this.collection.each(function(model) {
        var photo, _i, _len, _ref, _results;
        if (model.attributes.photos) {
          _ref = model.attributes.photos;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            photo = _ref[_i];
            _results.push(markup += "<img src='" + photo.original_size.url + "' />");
          }
          return _results;
        }
      });
      this.$el.html(markup);
      return this;
    }

  });


  return Export;
});
