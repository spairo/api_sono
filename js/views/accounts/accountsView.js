define([
  'jquery',
  'underscore',
  'backbone',
  'views/sidebar/SidebarView',
  'text!templates/accounts/accountsTemplate.html'
], function($, _, Backbone, SidebarView, accountsTemplate){

  var AccountsView = Backbone.View.extend({
    el: $("#page"),

    render: function(){

      $('.menu li').removeClass('active');
      $('.menu li a[href="#"]').parent().addClass('active');
      this.$el.html(accountsTemplate);

      var sidebarView = new SidebarView();
      sidebarView.render();

    }

  });

  return AccountsView;

});
