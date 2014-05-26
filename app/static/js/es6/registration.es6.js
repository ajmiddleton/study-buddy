/* global ajax, renderMenu */
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
        ajax('/courses', 'get', null, res=>{
          $('#content-container').empty().append(res);
          renderMenu();
        });
      }
    }, 'json');

    event.preventDefault();
  }
})();
