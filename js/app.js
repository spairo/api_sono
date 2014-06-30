// Router UI

var routerApp = angular.module('routerApp', ['ui.router', 'ngAnimate']);

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



//var myApp = angular.module('myApp', []);

routerApp.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

routerApp.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', conference_file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
          alert("todo");
        })
        .error(function(){
          alert("algo anda mal");
        });
    }
}]);

routerApp.controller('myCtrl', ['$scope', 'fileUpload', function($scope, fileUpload){

    $scope.uploadFile = function(){
        var file = $scope.myFile;
        console.log('file is ' + JSON.stringify(file));
        var uploadUrl = "http://godster.mx:5000/conference";
        fileUpload.uploadFileToUrl(file, uploadUrl);
    };

}]);
