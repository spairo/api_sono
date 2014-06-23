define([
  'jquery',
  'underscore',
  'backbone',
  'views/sidebar/SidebarView',
  'text!templates/upload/musicTemplate.html'
], function($, _, Backbone, SidebarView, musicTemplate){

  var MusicView = Backbone.View.extend({
    el: $("#page"),

    render: function(){

      $('.menu li').removeClass('active');
      $('.menu li a[href="#"]').parent().addClass('active');
      this.$el.html(musicTemplate);

      var sidebarView = new SidebarView();
      sidebarView.render();

    }

  });

  return MusicView;

});
