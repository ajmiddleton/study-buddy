/* exported ajax */

(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    renderUsersNew();
    renderLogin();
  }

  function renderLogin(){
    ajax('/login', 'get', null, res=>{
      $('#login-container').empty().append(res);
    });
  }

  function renderUsersNew(){
    ajax(`/users/new`, 'GET', null, res=>{
      $('#content-container').empty().append(res);
    });
  }
})();

function ajax(url, type, data={}, success=r=>console.log(r), dataType='html'){
  'use strict';
  $.ajax({
    url: url,
    type: type,
    dataType: dataType,
    data: data,
    success: success
  });
}
