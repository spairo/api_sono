define([
  'jquery',
  'underscore',
  'backbone',
  'global',
  'views/home/HomeView',
  'views/projects/ProjectsView',
  'views/contributors/ContributorsView',
  'views/devotional/DevotionalView',
  'views/upload/UploadView',
  'views/music/MusicView',
  'views/accounts/AccountsView',
  'views/footer/FooterView'
], function($, _, Backbone, global, HomeView, ProjectsView, ContributorsView, DevotionalView, UploadView, MusicView, AccountsView, FooterView) {

  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      'projects': 'showProjects',
      'users': 'showContributors',
      'devotional': 'showDevotional',

       // routes for upload module
      'upload': 'showUpload',
      'upload/music': 'showMusic',

      // routes for accounts module
      'accounts': 'showAccounts',

      // general landing page
      '*actions': 'defaultAction'
    }
  });

  var initialize = function(){

    var app_router = new AppRouter;

    app_router.on('route:showAccounts', function(){

        // Call render on the module we loaded in via the dependency array
        var accountsView = new AccountsView();

        accountsView.render();

    });

    app_router.on('route:showMusic', function(){

        // Call render on the module we loaded in via the dependency array
        var musicView = new MusicView();

        musicView.render();

    });

    app_router.on('route:showUpload', function(){

        // Call render on the module we loaded in via the dependency array
        var uploadView = new UploadView();

        uploadView.render();

    });

    app_router.on('route:showDevotional', function(){

        // Call render on the module we loaded in via the dependency array
        var devotionalView = new DevotionalView();

        devotionalView.render();

    });

    app_router.on('route:showProjects', function(){

        // Call render on the module we loaded in via the dependency array
        var projectsView = new ProjectsView();
        projectsView.render();

    });

    app_router.on('route:showContributors', function () {

        // Like above, call render but know that this view has nested sub views which
        // handle loading and displaying data from the GitHub API
        var contributorsView = new ContributorsView();
    });

    app_router.on('route:defaultAction', function (actions) {

       // lets display the home page
        var homeView = new HomeView();
        homeView.render();
    });

    // Unlike the above, we don't call render on this view as it will handle
    // the render call internally after it loads data. Further more we load it
    // outside of an on-route function to have it loaded no matter which page is
    // loaded initially.
    //var footerView = new FooterView();

    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});
