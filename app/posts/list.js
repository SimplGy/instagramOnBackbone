
define([
  'backbone',
  './posts'
], function(
  Backbone,
  Posts
) {

  var Export = Backbone.View.extend({

    tagName: 'ul',
    className: 'postsList',

    initialize: function() {
      this.collection = new Posts;
      this.listenTo(this.collection, 'sync', this.onSync);
      this.collection.fetch();
    },

    render: function() {
      this.$el.html('<li class="muted">Loading Images...</li>');
      return this;
    },

    onSync: function() {
      var markup = '', img;
      this.collection.each(function(model) {
        img = model.attributes.images.low_resolution;
        markup += "<li><a target='_blank' href='"+ model.attributes.link +"'><img src='"+ img.url +"' /></a></li>";
      });
      this.$el.html(markup);
      return this;
    }


  });


  return Export;
});
