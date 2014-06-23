define([
  'jquery',
  'underscore',
  'backbone',
  'views/sidebar/SidebarView',
  'text!templates/upload/uploadTemplate.html'
], function($, _, Backbone, SidebarView, uploadTemplate){

  var UploadView = Backbone.View.extend({
    el: $("#page"),

    render: function(){

      $('.menu li').removeClass('active');
      $('.menu li a[href="#"]').parent().addClass('active');
      this.$el.html(uploadTemplate);

      var sidebarView = new SidebarView();
      sidebarView.render();

    }

  });

  return UploadView;

});
