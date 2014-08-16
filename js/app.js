// appSonofe CMS v.1

var appSonofe = angular.module('appSonofe', ['ui.router', 'ngAnimate', 'angularFileUpload', 'ui.bootstrap', 'ngDialog']);


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
            //controller: 'UploadCtrl'

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

  appSonofe.factory('UploadedNode',function(){

    return { nodo:""};

  });

  appSonofe.factory('MyServiceArtistasync', function($http) {

    var obj = { content:null };

    $http.get('http://godster.mx/artist').success(function(data) {

        console.info("Trigger for MyArtist's Factory");
        obj.content = data.response;
    });

    return obj;

  });

  appSonofe.factory('MyServiceAlbumasync', function($http) {

    var obj = { content:null };

    $http.get('http://godster.mx/get_albums').success(function(data) {

        console.info("Trigger for Album's Factory");
        obj.content = data.response;
    });

    return obj;

  });


  //Only testing

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
                         {"name": "genre", "data": $scope.field4},
                         {"name": "company", "data": node}, ];

          albumUpload.uploadFileAndFieldsToUrl(file, fields, albumUrl);
      };

  }]);


  //Uploader Manager files



  appSonofe.controller('UploadController', ['$scope', 'FileUploader', '$modal', 'MyServiceAlbumasync', function($scope, FileUploader, MyServiceAlbumasync, $modal) {

        var uploader = $scope.uploader = new FileUploader({
            url: 'http://godster.mx/conference',
            method: 'POST',
            alias: 'conference_file',
            autoUpload: 'true',
        });

        // FILTERS
        /*
        uploader.filters.push({
            name: 'customFilter',
            fn: function(item *//*{File|FileLikeObject}*//*, options) {
                return this.queue.length < 10;
            }
        });*/

        // CALLBACKS
        /*
        uploader.onWhenAddingFileFailed = function(item *//*{File|FileLikeObject}*//*, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };*/

        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);

            /*var modalInstance = $modal.open({
              templateUrl: 'myModalMeta.html',
              controller: MetaInstanceCtrl,
              //backdrop: 'static',

            });*/

        };
        /*
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };*/
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        /*
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        */
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        /*
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };*/

        console.info('uploader', uploader);

    }]);

  //MetadataCtrl

  appSonofe.controller('MetaCtrl', function($scope, $http, MyServiceAlbumasync){

    $scope.albums = MyServiceAlbumasync;

    $scope.album = {};

    $scope.getAlbum = function() {

        $http({
              method  : 'POST',
              url     : 'http://godster.mx/album_info',
              data    : $.param($scope.album),
              headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .success(function(data, status) {
          //$scope.meta = data.response;
          //console.warn($scope.meta);


          //curl "http://127.0.0.1:5000/conference" -F cover_file=@"conferencia.mp3" -F node_id="032" -F album="album_node" -F title="thistitle" -F artist="artist_node" -F genre="thisgenre" -F year="thisyear" -F content_type="0"  -F company="node" -X PUT

          $scope.artist = data.response[0].artist;
          $scope.company = data.response[0].company;
          $scope.genre = data.response[0].genre;
          $scope.name = data.response[0].name;
          $scope.url = data.response[0].url;
          $scope.year = data.response[0].year;
        })
        .error(function(data, status){
          console.error('Oops! Algo salio mal');
        })
    };

    $scope.putAlbum = function(){

      //alert("Voy a actualizar la parte final");
      console.log("Kaboooom!");
    };

  });

  //MetaInstanceCtrl

  var MetaInstanceCtrl = function ($scope, $modalInstance) {
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  };

  // Artist List

  appSonofe.controller('ArtistlistCtrl', function($scope, $http){

  $http.get('http://godster.mx/artist'/*, { cache: false }*/).success(function(data){

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

          var node = MyServiceNodeasync.nodo;

          var file = $scope.file;

          var file2 = $scope.file2;

          var uploadUrl = "http://godster.mx/artist";

          var fields = [ {"name": "artist_name", "data": $scope.field1},
                         {"name": "company", "data": node},
                         {"name": "genre", "data": $scope.field2} ];

          fileUpload.uploadFileAndFieldsToUrl(file, file2, fields, uploadUrl);
      };

  }]);


  //Console Logs

/*
  console.info(var, "Info");
  console.warn(var, "Warning");
  console.error(var, "Error");
*/
