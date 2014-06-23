define([
  'jquery',
  'underscore',
  'backbone',
  'views/sidebar/SidebarView',
  'text!templates/devotional/devotionalTemplate.html'
], function($, _, Backbone, SidebarView, devotionalTemplate){

  var DevotionalView = Backbone.View.extend({
    el: $("#page"),

    render: function(){

      $('.menu li').removeClass('active');
      $('.menu li a[href="#"]').parent().addClass('active');
      this.$el.html(devotionalTemplate);

      var sidebarView = new SidebarView();
      sidebarView.render();

    }

  });

  return DevotionalView;

});
