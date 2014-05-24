(function() {
  'use strict';
  $(document).ready(init);
  function init() {
    getLastPage();
    renderLogin();
  }
  function getLastPage() {
    ajax('/lastPage', 'get', null, (function(res) {
      if (res.status) {
        ajax(res.lastPage, 'get', null, (function(lastPage) {
          $('#content-container').empty().append(lastPage);
          renderMenu();
        }));
      } else {
        renderUsersNew();
      }
    }), 'json');
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
function renderMenu() {
  'use strict';
  console.log('inside client render');
  ajax('/menu', 'GET', null, (function(res) {
    $('#menu-container').empty().append(res);
  }));
}
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
