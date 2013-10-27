
define([
  'backbone',
  'hb!./one.hbs'
], function(
  Backbone,
  tmpl
) {

  var Export = Backbone.View.extend({
    tagName: 'li',
    render: function(){
      this.$el.html(tmpl(this.model.attributes));
      return this;
    }
  });

  return Export;
});

