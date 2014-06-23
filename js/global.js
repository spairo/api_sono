$( document ).ready(function() {
  console.info( "global.js, ready." );
});

$(document).on('click', '#register_account', function (){


    //$('#messages').css("display","block");
    //$('#messages').empty();

    var email = $('.email').val();
    var passw = $('.passw').val();
    var passw2 = $('.passw2').val();
    var type = $('.account').val();

	  //username, password,second_password, user_role

    //alert(email);

    var xhr = new XMLHttpRequest({mozSystem: true});

    if( !email || !passw || !passw2 || !type){

        alert("All fields are required");

    }
    else{

        var data = { username: email, password:passw, second_password: passw2, user_role: type }

        $.ajax({
          type: "POST",
          url: "http://godster.mx:5000/users",
          data: data,
          success: function(data){
            alert("Registered with succeeds");
          },
          error: function(data){

          }
        });

    }
});


$(document).on('click', '#login_account', function (){

    //$('#messages').css("display","block");
    //$('#messages').empty();

    var email = $('.email_login').val();
    var passw = $('.passw_login').val();

    //username, password,second_password, user_role

    //alert(email);

    var xhr = new XMLHttpRequest({mozSystem: true});

    if( !email || !passw){
        alert("All fields are required");
    }
    else{

        var data = { username: email, password:passw }

        $.ajax({
          type: "POST",
          url: "http://godster.mx:5000/login",
          data: data,
          success: function(data){
            alert("You will redirect soon");
          },
          error: function(data){
            alert("User / Passw not found");
          }
        });

    }
});


$(document).on('click', '.opn', function (){
  alert("Testing account");
});



/*
(function(){

  window.App = {
    Models: {},
    Collections: {},
    Views: {},
    Router: {}
  };

  App.Router = Backbone.Router.extend({
      routes: {
          '': 'index',
          'upload': 'upload'
      },
      index: function(){
          console.info( "Index ready!" );
          //$(document.body).append("Index route has been called..");
          //alert("soy index");
      },
      upload: function(){
        alert("soy upload");

        $(document.result).append("<h1>Hello World</h1>");

      },

  });

  new App.Router;
  Backbone.history.start();

})();



    var RegisterModel = Backbone.Model.extend({
        urlRoot: 'http://godster.mx:5000/users',

    });


    var bostonCream = new RegisterModel({
        username: 'Bawston Cream',
        password: 'Bawston Cream',
        second_password: 'Bawston Cream',
        user_role: 'Ministerio'
    });

    //bostonCream.save();

   var RegisterCollection = Backbone.Collection.extend({

        model: RegisterModel,
        url: 'http://godster.mx:5000/users/',

        initialize: function(){
          //console.info("Playlist Collection started");
        }

    });

    var myplaylist = new RegisterCollection();
*/



    //myplaylist.fetch();
    //myplaylist.toJSON();


   /*
    var user = new Usermodel();
    // Notice that we haven't set an `id`
    var userDetails = {
        name: 'Thomas',
        email: 'thomasalwyndavis@gmail.com'


	      //username, password,second_password, user_role


    };
    // Because we have not set a `id` the server will call
    // POST /user with a payload of {name:'Thomas', email: 'thomasalwyndavis@gmail.com'}
    // The server should save the data and return a response containing the new `id`
    user.save(userDetails, {
        success: function (user) {
            alert(user.toJSON());
        }
    });*/


/*Backbone issues*/

/*

    var PlaylistModel = Backbone.Model.extend({

        //idAttribute: 'node_id',
        urlRoot: '/songs/create/playlist/',

        initialize: function(){
          console.info("Creado Modelo de Playlist");
        }

    });

    var PlaylistCollection = Backbone.Collection.extend({

        model: PlaylistModel,
        url: '/songs/user_playlists/',

        initialize: function(){
          console.info("Playlist Collection");
        }

    });

    var myplaylist = new PlaylistCollection();

    myplaylist.fetch();
    myplaylist.toJSON();

    console.log(myplaylist.toJSON());

    var PlaylistView = Backbone.View.extend({
       el: '#muestra'
    });
*/

    //var newplaylist = new PlaylistModel({ name: '1984full' });

    //newplaylist.save();


    //console.log(newplaylist.toJSON());
    //console.log("Nuevo Elemnto Agregado");

    /*var newplaylist = new PlaylistModel({

        name: 'betuca4'

    });

    newplaylist.save();
    newplaylist.toJSON();

    console.log(newplaylist.toJSON());*/


    /*var newplaylist = new PlaylistModel({ name: 'betuca4' });

        newplaylist.save( {
          success: function (newplaylist) {

          alert("Hecho");
          console.log("modello salvato nel db");
          console.log(newplaylist.toJSON());

        }
    });*/

    // Notice that we haven't set an `id`

    //var playlistDetails = {

      //  name: 'betuca2.'

    //};

    /*newplaylist.save(playlistDetails, {

        success: function (newplaylist) {
            newplaylist.toJSON();
            console.log(newplaylist.toJSON());
        }

    })*/


  /*var PlaylistModel = Backbone.Model.extend({

        urlRoot: '/songs/user_playlists/',

        initialize: function(){

            console.info("Nuevo modelo de: Playlist");

        }
  });

  var list = new PlaylistModel();

  list.toJSON();*/

  /*var PlaylistCollection = Backbone.Collection.extend({

        model: PlaylistModel,
        url: '/songs/user_playlists/',

        initialize: function(){
            console.info("Nuevo Collection de: Playlist");

        }
  });*/

  //var list = new PlaylistModel();

  //console.log(list.toJSON());

  //list.toJSON();
  //list.fetch();


  /*var Details = {
      node_id: '3',
      name: 'thomasalwyndavis'
  };

  list.save(Details, {
      success: function (list) {
          alert(list.toJSON());
          console.log(list.toJSON());
      }
  })*/
