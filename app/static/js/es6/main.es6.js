/* exported ajax, renderMenu */

(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    getLastPage();
    renderLogin();
  }

  function getLastPage(){
    ajax('/lastPage', 'get', null, res=>{
      if(res.status){
        ajax(res.lastPage, 'get', null, lastPage=>{
          $('#content-container').empty().append(lastPage);
          renderMenu();
        });
      }else{
        renderUsersNew();
      }
    },'json');
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

function renderMenu(){
  'use strict';
  console.log('inside client render');
  ajax('/menu', 'GET', null, res=>{
    $('#menu-container').empty().append(res);
  });
}

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
