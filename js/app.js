// Router UI

var routerApp = angular.module('routerApp', ['ui.router', 'ngAnimate', 'audiometa']);

routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        //Default Module

        .state('home', {
            url: '/home',
            templateUrl: 'templates/tmp_home.html'
        })

        //Upload Module

        .state('upload', {
            url: '/upload',
            templateUrl: 'templates/upload/uploadTemplate.html'
        })
            .state('music', {
                url: '/upload/music',
                templateUrl: 'templates/upload/musicTemplate.html'
            })
        //Accounts Module

        .state('accounts', {
            url: '/accounts',
            templateUrl: 'templates/accounts/accountsTemplate.html'
        })
            .state('create', {
                url: '/accounts/create',
                templateUrl: 'templates/accounts/createTemplate.html'
            })


        .state('about', {
            url: '/about',
            templateUrl: 'templates/tmp_about.html'
        });

});
