$(document).ready(function(){

  console.log('hello');
  // $(".pwd-success").hide()
  $("#edit").click(function(){
    $("#edit").text('cancle')
    $('#edit-bio').slideDown(500)
  });

  $("#new_password").click(function(){
    $("#after-pwd").slideDown(700)
  })

   $("#new_password_confirm").click(function(){
     $("#after-pwd_conf").fadeIn(700)
   })
   console.log($("#user_id").val());
   $("#change-password").submit(function(event){
     console.log('older '+$('#former_password').val());
     console.log('new '+$('#new_password').val());
     console.log('new_c '+$('#new_password_confirm').val());
     $.post('/profile/change/pwd/'+$("#user_id").val()+'',
      {
        former_password:$('#former_password').val(),
        new_password:$('#new_password').val(),
        confirm_new_password:$('#new_password_confirm').val()
      },
      function(data){
        if(data.invalid){
            $('#pwd_error').text(data.invalid)
            $("#former_password").css({'border':'solid 1px red','border-width':'0 0 1px 0'})
        }else{
            $('#pwd_error').text('')
          $("#former_password").css({'border':'solid 1px white','border-width':'0 0 1px 0'})
        }
        if (data.notmatch){
          $("#pwd_conf_error").text(data.notmatch)
          $('#new_password_confirm').css({'border':'solid 1px red','border-width':'0 0 1px 0'})
        }else {
          $("#pwd_conf_error").text('')
          $('#new_password_confirm').css({'border':'solid 1px white','border-width':'0 0 1px 0'})

        }
        if(data.equalToOld){
          $("#main_error").text(data.equalToOld)
          $("#former_password").css({'border':'solid 1px red','border-width':'0 0 1px 0'})
          $("#new_password").css({'border':'solid 1px red','border-width':'0 0 1px 0'})
        }else{
          $("#main_error").text('')
          $("#former_password").css({'border':'solid 1px white','border-width':'0 0 1px 0'})
          $("#new_password").css({'border':'solid 1px white','border-width':'0 0 1px 0'})
        }
        if(data.changed){
          $("#my_msg").fadeIn(200).delay(2000).fadeOut(200)
          $('#former_password').val("")
          $('#new_password').val("")
          $('#new_password_confirm').val("")
          $("#after-pwd").hide()
           $("#after-pwd_conf").hide()

        }
      });
      event.preventDefault()
   });
});
