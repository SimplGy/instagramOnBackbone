
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
      this.listenTo(this.collection, 'sync', this.onSync);
      this.collection.fetch();
    },

    render: function() {
      this.$el.html('<p>Hello</p>');
      return this;
    },

    onSync: function() {
      var markup = '', img;
      this.collection.each(function(model) {
        img = model.attributes.images.thumbnail;
        markup += "<img src='" + img.url + "' />"
      });
      this.$el.html(markup);
      return this;
    }


  });


  return Export;
});
