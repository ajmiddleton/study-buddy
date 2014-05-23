(function() {
  'use strict';
  $(document).ready(init);
  function init() {
    renderUsersNew();
    renderLogin();
  }
  function renderLogin() {
    ajax('/login', 'get', null, (function(res) {
      $('#login-container').empty().append(res);
    }));
  }
  function renderUsersNew() {
    ajax("/users/new", 'GET', null, (function(res) {
      $('#content-container').empty().append(res);
    }));
  }
})();
function ajax(url, type) {
  'use strict';
  var data = arguments[2] !== (void 0) ? arguments[2] : {};
  var success = arguments[3] !== (void 0) ? arguments[3] : (function(r) {
    return console.log(r);
  });
  var dataType = arguments[4] !== (void 0) ? arguments[4] : 'html';
  $.ajax({
    url: url,
    type: type,
    dataType: dataType,
    data: data,
    success: success
  });
}

//# sourceMappingURL=main.map
