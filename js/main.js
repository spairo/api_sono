$( document ).ready(function() {
  console.info( "ready!" );
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
        //$('#messages').append('<div class="animated flash alert alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>All fields are required</div>').fadeOut(3000);
        alert("All fields are required");
    }
    else{

        //alert("Venga!");

        var data = { username: email, password:passw, second_password: passw2, user_role: type }

        $.ajax({
          type: "POST",
          url: "http://127.0.0.1:5000/users",
          data: data,
          success: function(data){
              alert("entro")
              console.log(response);
          },
          error: function(data){
              console.log(response);
          }
        });

    }
});



    /*var UserModel = Backbone.Model.extend({
        urlRoot: 'http://godster.mx:5000/login/',
        defaults: {
            name: '',
            email: ''
        }
    });
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
    });/*

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
