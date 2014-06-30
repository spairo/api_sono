//jQuery Old

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
