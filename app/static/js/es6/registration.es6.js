/* global ajax */
/* jshint unused:false */

(function(){
  'use strict';

  $('#submit-registration').click(register);

  function register(event){
    var data = $('#register').serialize();
    console.log(data);

    ajax('/users', 'post', data, res=>{
      if(res.status){
        $('#login-container').empty().append(res.loginHTML);
      }
    }, 'json');

    event.preventDefault();
  }
})();
