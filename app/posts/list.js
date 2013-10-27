
define([
  'backbone',
  './posts',
  'hb!./list.hbs'
], function(
  Backbone,
  Posts,
  tmpl
) {


  var Export,
    _listSel = '#PostsList';


  Export = Backbone.View.extend({

    events: {
      'click #Refresh': 'onRefresh'
    },

    className: 'postsList',

    initialize: function() {
      this.collection = new Posts;
      this.listenTo(this.collection, 'sync', this.onSync);
      this.collection.fetch();
    },

    render: function() {
      this.$el.html(tmpl());
      return this;
    },

    onSync: function() {
      this.$(_listSel).empty(); // Clear the current page on a sync

      // For each model, render the view and insert the markup.
      this.collection.each(function(model) {
        this.$(_listSel).append(model.view.render().el);
      }.bind(this));

      return this;
    },

    onRefresh: function(){
      this.$(_listSel).empty();
      this.collection.fetch();
    }


  });


  return Export;
});
