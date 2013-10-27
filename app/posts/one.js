
define([
  'backbone'
], function(
  Backbone
) {

  var Export;

  Export = Backbone.View.extend({
    initialize: function() {
      return console.log('Incident Single View Init');
    }
  });

  return Export;
});
