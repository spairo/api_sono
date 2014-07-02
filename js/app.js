// appSonofe CMS v.1

var appSonofe = angular.module('appSonofe', ['ui.router', 'ngAnimate', 'angularFileUpload']);


  appSonofe.config(function($stateProvider, $urlRouterProvider){

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

  //Upload Manager files

  appSonofe.controller('UploadController', function ($scope, $fileUploader) {
      'use strict';

      // create a uploader with options
      var uploader = $scope.uploader = $fileUploader.create({
          scope: $scope,                          // to automatically update the html. Default: $rootScope
          url: 'http://godster.mx/conference',
          method: 'POST',
          alias: 'conference_file',
          isHTML5: true,
          withCredentials: true,
          formData: [
              { key: 'value' }
          ],
          filters: [
              function (item) {                    // first user filter
                  console.info('filter1');
                  return true;
              }
          ]
      });


      // FAQ #1
      var item = {
          file: {
              name: 'test',
              size: 1e6
          },
          progress: 100,
          isUploaded: true,
          isSuccess: true
      };
      item.remove = function() {
          uploader.removeFromQueue(this);
      };
      uploader.queue.push(item);
      uploader.progress = 100;


      // ADDING FILTERS

      uploader.filters.push(function (item) { // second user filter
          console.info('filter2');
          return true;
      });

      // REGISTER HANDLERS

      uploader.bind('afteraddingfile', function (event, item) {
          console.info('After adding a file', item);
      });

      uploader.bind('whenaddingfilefailed', function (event, item) {
          console.info('When adding a file failed', item);
      });

      uploader.bind('afteraddingall', function (event, items) {
          console.info('After adding all files', items);
      });

      uploader.bind('beforeupload', function (event, item) {
          console.info('Before upload', item);
      });

      uploader.bind('progress', function (event, item, progress) {
          console.info('Progress: ' + progress, item);
      });

      //success $scope.artist = data.response; 

      uploader.bind('success', function (event, xhr, item, response, data) {
          //console.info('Success', xhr, item, response);
          //alert(response);
        console.log(response);

        console.log(response, "Logged!");
		console.info(response, "Logged!");
		console.warn(response, "Logged!");
		console.debug(response, "Logged!");
		console.error(response, "Logged!");


      });


      uploader.bind('cancel', function (event, xhr, item) {
          console.info('Cancel', xhr, item);
      });

      uploader.bind('error', function (event, xhr, item, response) {
          console.info('Error', xhr, item, response);
          alert("Oops, algo salio mal");
          console.log(response);
      });

      uploader.bind('complete', function (event, xhr, item, response) {
          console.info('Complete', xhr, item, response);
      });

      uploader.bind('progressall', function (event, progress) {
          console.info('Total progress: ' + progress);
      });

      uploader.bind('completeall', function (event, items) {
          console.info('Complete all', items);
      });

  });

  // Artist List

  appSonofe.controller('ArtistlistCtrl', function($scope, $http){
    $http.get('http://godster.mx/artist', { cache: true }).success(function(data){

      $scope.artist = data.response;

    });
  });

  //Create Artist

  appSonofe.directive('fileModel', ['$parse', function ($parse) {

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

  appSonofe.service('fileUpload', ['$http', function ($http) {

      this.uploadFileAndFieldsToUrl = function(file, file2, fields, uploadUrl){

          var fd = new FormData();

          fd.append('background_image', file);
          fd.append('profile_image', file2);

          for(var i = 0; i < fields.length; i++){

              fd.append(fields[i].name, fields[i].data)

          }

          $http.post(uploadUrl, fd, {
              transformRequest: angular.identity,
              headers: {'Content-Type': undefined}
          })

          .success(function(){
              alert("Artista Creado exitosamente");
          })

          .error(function(){
            alert("Oops! algo salio mal");
          });
      }
  }]);

  appSonofe.controller('createArtistCtrl', ['$scope', 'fileUpload', function($scope, fileUpload){

      $scope.uploadForm = function(){

          var file = $scope.myFile;
          var file2 = $scope.myFile2;

          console.log('file is ' + JSON.stringify(file));

          var uploadUrl = "http://godster.mx/artist";

          var fields = [ {"name": "artist_name", "data": $scope.field1},
                         {"name": "company", "data": $scope.field2},
                         {"name": "genre", "data": $scope.field3} ];

          fileUpload.uploadFileAndFieldsToUrl(file, file2, fields, uploadUrl);
      };

  }]);
