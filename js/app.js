// Router UI

var appSonofe = angular.module('appSonofe', ['ui.router', 'ngAnimate', 'angularFileUpload']);

appSonofe.config(function($stateProvider, $urlRouterProvider) {

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


//Basic upload

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
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('conference_file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(data, status, headers, config){
          alert("file is uploaded successfully.."+data+"..status.."+status);
          // file is uploaded successfully
          console.log(data);
        })
        .error(function(data, status, headers, config){
          alert("algo fallo."+data+"..status.."+status);
          // file is uploaded successfully
          console.log(data);
        });
    }
}]);

appSonofe.controller('myCtrl', ['$scope', 'fileUpload', function($scope, fileUpload){

    $scope.uploadFile = function(){
        var file = $scope.myFile;
        console.log('file is ' + JSON.stringify(file));
        var uploadUrl = "http://godster.mx:5000/conference";
        fileUpload.uploadFileToUrl(file, uploadUrl);
    };

}]);

//Upload Manager files

var UploadCtrl = [ '$scope', '$upload', function($scope, $upload) {
  $scope.onFileSelect = function($files) {
    //$files: an array of files selected, each file has name, size, and type.
    for (var i = 0; i < $files.length; i++) {
      var file = $files[i];
      $scope.upload = $upload.upload({
        url: 'http://godster.mx:5000/conference', //upload.php script, node.js route, or servlet url
        // method: 'POST' or 'PUT',
        // headers: {'header-key': 'header-value'},
        // withCredentials: true,
        data: {myObj: $scope.myModelObj},
        file: file, // or list of files: $files for html5 only
        /* set the file formData name ('Content-Desposition'). Default is 'file' */
        //fileFormDataName: myFile, //or a list of names for multiple files (html5).
        /* customize how data is added to formData. See #40#issuecomment-28612000 for sample code */
        //formDataAppender: function(formData, key, val){}
      }).progress(function(evt) {
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      }).success(function(data, status, headers, config) {
        // file is uploaded successfully
        console.log(data);
      });
      //.error(...)
      //.then(success, error, progress);
      //.xhr(function(xhr){xhr.upload.addEventListener(...)})// access and attach any event listener to XMLHttpRequest.
    }
    /* alternative way of uploading, send the file binary with the file's content-type.
       Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed.
       It could also be used to monitor the progress of a normal http post/put request with large data*/
    // $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
  };
}];
