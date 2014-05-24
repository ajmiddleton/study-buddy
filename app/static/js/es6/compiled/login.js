(function() {
  'use strict';
  $('#login').click(login);
  $('#logout').click(logout);
  function logout() {
    ajax('/logout', 'get', null, (function(res) {
      if (res.status) {
        $('#login-container').empty().append(res.loginHTML);
        ajax('/users/new', 'get', null, (function(res) {
          $('#content-container').empty().append(res);
          $('#menu-container').empty();
        }));
      }
    }), 'json');
  }
  function login() {
    var email = $('#email').val();
    var password = $('#password').val();
    ajax('/login', 'post', {
      email: email,
      password: password
    }, (function(res) {
      if (res.status) {
        $('#login-container').empty().append(res.loginHTML);
        ajax('/courses/new', 'get', null, (function(res) {
          $('#content-container').empty().append(res);
        }));
        renderMenu();
      }
    }), 'json');
  }
})();

//# sourceMappingURL=login.map
