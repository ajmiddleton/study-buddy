/* global ajax */
/* jshint unused:false */

(function(){
  'use strict';

  $('#login').click(login);
  $('#logout').click(logout);

  function logout(){
    ajax('/logout', 'get', null, res=>{
      if(res.status){
        $('#login-container').empty().append(res.loginHTML);
        ajax('/users/new', 'get', null, res=>{
          $('#content-container').empty().append(res);
        });
      }
    }, 'json');
  }

  function login(){
    var email = $('#email').val();
    var password = $('#password').val();

    ajax('/login', 'post', {email:email, password:password}, res=>{
      if(res.status){
        $('#login-container').empty().append(res.loginHTML);
        ajax('/courses/new', 'get', null, res=>{
          $('#content-container').empty().append(res);
        });
        renderMenu();
      }
    }, 'json');
  }

  function renderMenu(){
    console.log('inside client render');
    ajax('/menu', 'GET', null, res=>{
      $('#menu-container').empty().append(res);
    });

  }

})();
