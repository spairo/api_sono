// appSonofe CMS v.1

var appSonofe = angular.module('appSonofe', ['ui.router', 'ngAnimate', 'angularFileUpload', 'ui.bootstrap']);



  appSonofe.config(function($stateProvider, $urlRouterProvider){

      $urlRouterProvider.otherwise('/start');

      $stateProvider

        //Default Module

        .state('start', {
            url: '/start',
            templateUrl: 'js/views/start/index.html'
        })

        //Register Form

        .state('signup', {
            url: '/signup',
            templateUrl: 'js/views/signup/form.html',
            controller: 'SignupCtrl'
        })
            .state('signup.interests', {
                url: '/interests',
                templateUrl: 'js/views/signup/form-interests.html'
            })

            .state('signup.profile', {
                url: '/profile',
                templateUrl: 'js/views/signup/form-profile.html'
            })

            .state('signup.join', {
                url: '/join',
                templateUrl: 'js/views/signup/form-join.html'
            })

        //Dashboard Module

        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'js/views/dashboard/index.html'
        })

        //Upload Module

        .state('uploader', {
            url: '/uploader',
            templateUrl: 'js/views/upload/uploader.html',
            controller: 'UploadCtrl'

        })
            .state('uploader.type', {
                url: '/type',
                templateUrl: 'js/views/upload/uploader-type.html'
            })
            .state('uploader.album', {
                url: '/album',
                templateUrl: 'js/views/upload/uploader-album.html'
            })
            .state('uploader.files', {
                url: '/files',
                templateUrl: 'js/views/upload/uploader-files.html'
            })
            .state('uploader.metadata', {
                url: '/metadata',
                templateUrl: 'js/views/upload/uploader-metadata.html'
            })

        //Accounts Module

        .state('accounts', {
            url: '/accounts',
            templateUrl: 'js/views/accounts/index.html'
        })
            .state('create', {
                url: '/accounts/create',
                templateUrl: 'js/views/accounts/create.html'
            })

        //Pages
        .state('Login', {
            url: '/login',
            templateUrl: 'js/views/pages/login.html'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'js/views/pages/about.html'
        });

  });


  //Factories

  appSonofe.factory('MyServiceNodeasync',function(){

    return { nodo:"", role: ""};

  });

  appSonofe.factory('MyServiceArtistasync', function($http) {

    var obj = { content:null };

    $http.get('http://godster.mx/artist', { cache: false }).success(function(data) {

        console.info("Trigger for MyArtist's Factory");
        obj.content = data.response;
    });

    return obj;

  });

  appSonofe.factory('MyServiceAlbumasync', function($http) {

    var obj = { content:null };

    $http.get('http://godster.mx/get_albums', { cache: false }).success(function(data) {

        console.info("Trigger for Album's Factory");
        obj.content = data.response;
    });

    return obj;

  });





  //only testing
  appSonofe.controller('fruitsController', function($scope, MyServiceNodeasync) {
    $scope.foo = MyServiceNodeasync;
  });


  //Form Register

  appSonofe.controller('SignupCtrl', function($scope, $http) {

      $scope.formsignup = {};

      $scope.processForm = function() {
      	$http({
              method  : 'POST',
              url     : 'http://godster.mx/users',
              data    : $.param($scope.formsignup),  // pass in data as strings
              headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .success(function(data, status) {

            var resp = data.response;

            if(resp === "user created"){

                $scope.result = true;

            }else{

                $scope.result = false;
            }

        })
        .error(function(data){
            alert("Oops! Algo salio mal, intenta otra vez");
        })
      };

  });

  // Login Modal

  var ModalLoginCtrl = function ($scope, $modal, $log) {

      $scope.openlogin = function (size) {

          var modalInstance = $modal.open({
            templateUrl: 'myModalLogin.html',
            controller: ModalInstanceCtrl,
            size: size,
            backdrop: 'static',
            resolve: {

            }
          });
      };

  };

    var ModalInstanceCtrl = function ($scope, $modalInstance) {
      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
    };

  //Form Login

  appSonofe.controller('LoginCtrl', function($scope, $http, MyServiceNodeasync) {

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };

      $scope.formlogin = {};

      $scope.processlogin = function() {

        $http({
              method  : 'POST',
              url     : 'http://godster.mx/login',
              data    : $.param($scope.formlogin),
              headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .success(function(data, status) {

            var user_node = data.node_id;
            var user_role = data.user_role;

            $scope.Nodeasync = MyServiceNodeasync;

            $scope.Nodeasync.nodo = user_node;
            $scope.Nodeasync.role = user_role;


            //$scope.node = response.response[0].node_id;

            //var node = response.response[0].node_id;

            //$scope.noode = Nodo.sayHello(node);

            /*
            var resp = data.response;

            if(resp === "Login Successfu"){

                $scope.result = data.response;

            }else{

                $scope.result = data.response;
            }*/

        })
        .error(function(data, status){

            alert("Oops! Algo salio mal");

        })
      };
  });

  // Form Album

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



  appSonofe.service('albumUpload', ['$http', function ($http) {

      this.uploadFileAndFieldsToUrl = function(file, fields, albumUrl){

          var fd = new FormData();

          fd.append('cover', file);

          for(var i = 0; i < fields.length; i++){
              fd.append(fields[i].name, fields[i].data)
          }

          $http.post(albumUrl, fd, {
              transformRequest: angular.identity,
              headers: {'Content-Type': undefined }
          })
          .success(function(response, status){

              alert("Album Creado exitosamente");
              console.info(response);

          })
          .error(function(){
            alert("Oops! algo salio mal");
          });
      }

  }]);

  appSonofe.controller('AlbumCtrl', ['$scope', 'albumUpload', 'MyServiceNodeasync', 'MyServiceArtistasync', function($scope, albumUpload, MyServiceNodeasync, MyServiceArtistasync){

      $scope.artists = MyServiceArtistasync;

      $scope.albumForm = function(){

          var albumUrl = "http://godster.mx/album";

          var file = $scope.myFile;

          var node = MyServiceNodeasync.nodo;

          var fields = [ {"name": "name", "data": $scope.field1},
                         {"name": "artist", "data": $scope.field2},
                         {"name": "year", "data": $scope.field3},
                         {"name": "genere", "data": $scope.field4},
                         {"name": "company", "data": node}, ];

          albumUpload.uploadFileAndFieldsToUrl(file, fields, albumUrl);
      };

  }]);

  //Form Uploader

  appSonofe.controller('UploadCtrl', function($scope) {

      // we will store all of our form data in this object
      $scope.formupload = {};

      // function to process the form
      $scope.processForm = function() {
          alert('awesome!');
      };

  });

  //Upload Manager files

  appSonofe.controller('UploadController', function ($scope, $fileUploader, MyServiceAlbumasync) {

      'use strict';

      $scope.albums = MyServiceAlbumasync;

      var uploader = $scope.uploader = $fileUploader.create({
          scope: $scope,
          url: 'http://godster.mx/conference',
          method: 'POST',
          alias: 'conference_file',
          //headers 'Content-Type: application/json',
          formData: [
              { key: 'value' }
          ]
      });

      // faq #1
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
      uploader.progress = 100;

      // ADDING FILTERS

      uploader.filters.push(function (item) { // second user filter

          console.info('Adding', item);
          return true;

      });

      // HANDLERS

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

        //get response(node)

        //$scope.node = response.response[0].node_id;

        //var node = response.response[0].node_id;

        //$scope.noode = Nodo.sayHello(node);

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

  // Artist List

  appSonofe.controller('ArtistlistCtrl', function($scope, $http){

    $http.get('http://godster.mx/artist', { cache: false }).success(function(data){

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

  appSonofe.controller('createArtistCtrl', ['$scope', 'fileUpload', 'MyServiceNodeasync', function($scope, fileUpload, MyServiceNodeasync){

      $scope.uploadForm = function(){

          var file = $scope.myFile;
          var file2 = $scope.myFile2;

          var node = MyServiceNodeasync.nodo;

          console.log('file is ' + JSON.stringify(file));

          var uploadUrl = "http://godster.mx/artist";

          var fields = [ {"name": "artist_name", "data": $scope.field1},
                         {"name": "company", "data": node},
                         {"name": "genre", "data": $scope.field2} ];

          fileUpload.uploadFileAndFieldsToUrl(file, file2, fields, uploadUrl);
      };

  }]);

// Directives

  appSonofe.directive('validFile',function(){
    return {
      require:'ngModel',
      link:function(scope,el,attrs,ngModel){
        el.bind('change',function(){
          scope.$apply(function(){
            ngModel.$setViewValue(el.val());
            ngModel.$render();
          });
        });
      }
    }
  });


// UI-Bootstrap



  //Console Logs

/*
  console.info(var, "Info");
  console.warn(var, "Warning");
  console.error(var, "Error");
*/
