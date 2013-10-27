
define([
  'jquery',
  'backbone'
], function(
  $,
  Backbone
) {

  var Collection, Model;


  Model = Backbone.Model.extend({
    parse: function(resp) {
      return resp;
    }
  });


  Collection = Backbone.Collection.extend({
    model: Model,
    url: "https://api.instagram.com/v1/media/popular",

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
      var that = this;
      $.ajax({
        url: this.url,
        success: function(resp, message, xhr) {
//          console.log({
//            data:data,
//            arguments:arguments
//          });
          if (resp.meta && resp.meta.code == 400) { // 400 error
            that.trigger('error', that, xhr, resp.meta.error_message);
          } else if (resp.meta.code == 200) { // all good in the hood, g
            that.add(resp.data);
            that.trigger('sync');
          } else { // unknown error
            that.trigger('error', that, xhr, 'Unkown error with sync');
          };
        }
      });

      return this;
    }


  });
  return Collection;
});
