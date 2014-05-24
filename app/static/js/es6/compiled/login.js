(function() {
  'use strict';
  $('#login').click(login);
  $('#logout').click(logout);
  function logout() {
    ajax('/logout', 'get', null, (function(res) {
      if (res.status) {
        $('#login-container').empty().append(res.loginHTML);
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
        renderMenu();
      }
    }), 'json');
  }
  function renderMenu() {
    console.log('inside client render');
    ajax('/menu', 'GET', null, (function(res) {
      $('#menu-container').empty().append(res);
    }));
  }
})();

//# sourceMappingURL=login.map
