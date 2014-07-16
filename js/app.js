// appSonofe CMS v.1

var appSonofe = angular.module('appSonofe', ['ui.router', 'ngAnimate', 'angularFileUpload', 'audiometa', 'ui.bootstrap']);


  appSonofe.config(function($stateProvider, $urlRouterProvider){

      $urlRouterProvider.otherwise('/home');

      $stateProvider

        //Default Module

        .state('home', {
            url: '/home',
            templateUrl: 'js/views/tmp_home.html'
        })

        //Upload Module

        .state('upload', {
            url: '/upload',
            templateUrl: 'js/views/upload/uploadTemplate.html'
        })
            .state('music', {
                url: '/upload/music',
                templateUrl: 'js/views/upload/musicTemplate.html'
            })

        //Accounts Module

        .state('accounts', {
            url: '/accounts',
            templateUrl: 'js/views/accounts/accountsTemplate.html'
        })
            .state('create', {
                url: '/accounts/create',
                templateUrl: 'js/views/accounts/createTemplate.html'
            })


        //Login / Register Module

        .state('start', {
            url: '/start',
            templateUrl: 'js/views/start/startTpl.html'
        })
          .state('second', {
              url: '/start/second',
              templateUrl: 'js/views/start/start2Tpl.html'
          })

        //Extra

        .state('about', {
            url: '/about',
            templateUrl: 'js/views/tmp_about.html'
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
          //headers 'Content-Type: application/json',
          formData: [
              { key: 'value' }
          ]
          /*,filters: [
              function (item) {                    // first user filter
                  console.info('filter1');
                  return true;
              }
          ]*/
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
      //uploader.queue.push(item);
      //uploader.progress = 100;


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

      uploader.bind('success', function (event, xhr, item, response) {

          console.info('Success', xhr, item, response);

          console.warn("ATENCIO", item);

          var node = response.response[0].node_id;

          return node.data;
          //  return response.data;
	    });

      uploader.bind('cancel', function (event, xhr, item) {
          console.info('Cancel', xhr, item);
      });

      uploader.bind('error', function (event, xhr, item, response) {
          console.info('Error', xhr, item, response);
          console.error("Oops, something went wrong");
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

  // Metadata

  var ModalDemoCtrl = function ($scope, $modal, $log) {

    $scope.items = ['item1', 'item2', 'item3'];

    //name ng-click
    $scope.openmeta = function (size) {

      var modalInstance = $modal.open({
        templateUrl: 'myModalContent.html',
        controller: ModalInstanceCtrl,
        backdrop: 'static',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
  };

  var ModalInstanceCtrl = function ($scope, $modalInstance, items) {

    $scope.items = items;
    $scope.selected = {
      item: $scope.items[0]
    };

    $scope.ok = function () {
      $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  };

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

          $http.put(uploadUrl, fd, {
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

  appSonofe.controller('MetadataEditCtrl', ['$scope', 'fileUpload', function($scope, fileUpload){

      $scope.uploadForm = function(){

          var file = $scope.myFile;

          console.log('file is ' + JSON.stringify(file));

          var uploadUrl = "http://godster.mx/artist";

          var fields = [ {"name": "artist_name", "data": $scope.field1},
                         {"name": "company", "data": $scope.field2},
                         {"name": "genre", "data": $scope.field3} ];

          fileUpload.uploadFileAndFieldsToUrl(file, fields, uploadUrl);
      };

  }]);

  /////////////////////////////////////

  //curl "http://127.0.0.1:5000/conference" -F cover_file=@"conferencia.mp3" -F node_id="032" -F album="thisalbum" -F title="thistitle" -F artist="thisartist" -F genre="thisgenre" -F year="thisyear" -F content_type="023" -X PUT

  function MyCtrl($scope, $window) {

      $scope.name = 'Superhero';

      MyCtrl.prototype.$scope = $scope;
  }

  MyCtrl.prototype.setFile = function(element) {
      var $scope = this.$scope;

      $scope.$apply(function() {

          $scope.theFile = element.files[0];

      });
  };

//////////////////////////

  appSonofe.controller('MetadataCtrl', ["AudioParser", function ($scope, AudioParser) {

          var setFiles;

          $scope.setFile = function(file){
              AudioParser.getInfo(file).then(function(fileInfo){
                  // do something here
              });
          };

  }]);

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

  // Login Modal

  var ModalLoginCtrl = function ($scope, $modal, $log) {

      $scope.openlogin = function (size) {

          var modalInstance = $modal.open({
            templateUrl: 'myModalLogin.html',
            controller: ModalInstanceCtrl,
            size: size,
            backdrop: 'static',
            resolve: {
              items: function () {
                return $scope.items;
              }
            }
          });

          modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
          }, function () {
            $log.info('Modal dismissed at: ' + new Date());
          });

          var ModalInstanceCtrl = function ($scope, $modalInstance, items) {

            $scope.items = items;
            $scope.selected = {
              item: $scope.items[0]
            };

            $scope.ok = function () {
              $modalInstance.close($scope.selected.item);
            };

            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            };

          };
      };
  };

  //Login Post

  appSonofe.controller('LoginCtrl', function($scope, $http, $log){

    $scope.formlogin = {};

    $scope.processForm = function() {

        $http({
              method  : 'POST',
              url     : 'http://godster.mx/login',
              data    : $scope.formlogin,
              headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)

        }).success(function(data) {
            console.log(data);
            $log.info('Log In: ' + new Date());


        });

    };

  });

  //Register Modal

  var ModalSigninCtrl = function ($scope, $modal, $log) {

      $scope.opensignup = function (size) {

          var modalInstance = $modal.open({
            templateUrl: 'myModalSignin.html',
            size: size,
            backdrop: 'static',
            resolve: {
              items: function () {
                return $scope.items;
              }
            }
          });

      };
  };


  // Register

  appSonofe.controller('SignupCtrl', function($scope, $http, $log){

    $scope.formsignup = {};

    $scope.signup = function() {

        $http({
              method  : 'POST',
              url     : 'http://godster.mx/users',
              data    : $scope.formsignup,
              headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)

        }).success(function(data) {

            console.log(data);
            $log.info('Sign Up: ' + new Date());

        });

    };

  });


  //Tools

/*
  console.info(var, "Info");
  console.warn(var, "Warning");
  console.error(var, "Error");
*/
