(function() {
  'use strict';
  $('#submit-registration').click(register);
  function register(event) {
    var data = $('#register').serialize();
    console.log(data);
    ajax('/users', 'post', data, (function(res) {
      if (res.status) {
        $('#login-container').empty().append(res.loginHTML);
        ajax('/courses', 'get', null, (function(res) {
          $('#content-container').empty().append(res);
          renderMenu();
        }));
      }
    }), 'json');
    event.preventDefault();
  }
})();

//# sourceMappingURL=registration.map
