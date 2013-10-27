
define([
  'jquery',
  'backbone',
  'posts/one'
], function(
  $,
  Backbone,
  PostView
) {

  var Collection, Model;


  Model = Backbone.Model.extend({
    initialize: function(){
      this.view = new PostView({ model: this })
    }
  });


  Collection = Backbone.Collection.extend({
    model: Model,
    url: function(options){
      if (options && options.tag){
        return "https://api.instagram.com/v1/tags/"+ options.tag +"/media/recent";
      }
      return "https://api.instagram.com/v1/media/popular";
    },

    initialize: function() {
      this.on('error', function(collection, xhr, message) {
        console.warn(message);
        console.log({
          xhr: xhr,
          collection: collection
        })
      });
    },

    sync: function(method, model, options) {
      $.ajax({
        url: this.url(options),
        success: this.synced.bind(this),
        failure: function(){ console.log(arguments) }
      });
      return this;
    },

    synced: function(resp, message, xhr) {
      if (resp.meta && resp.meta.code == 400) { // 400 error
        this.trigger('error', that, xhr, resp.meta.error_message);
      } else if (resp.meta.code == 200) { // all good in the hood, g
        this.add(resp.data);
        this.trigger('sync');
        console.log(resp);
      } else { // unknown error
        this.trigger('error', that, xhr, 'Unkown error with sync');
      }
    }


  });
  return Collection;
});
