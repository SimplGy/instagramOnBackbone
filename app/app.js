
define([
    'jquery',
    'posts/list'
], function(
    $,
    PostsList
) {

  var App
  var _appSel = '#App'

  // Constructor
  App = function(options) {
    $.ajaxSetup({
      data: {
        client_id: options.clientId
      },
      dataType: 'jsonp'
    })
    this.showPosts()
  };

  // Prototype
  App.prototype = {

    showPosts: function() {
      this.curView = new PostsList;
      return $(_appSel).html(this.curView.render().el);
    }

  };


  return App;
});
