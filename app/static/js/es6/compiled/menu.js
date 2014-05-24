(function() {
  'use strict';
  $(document).ready(init);
  function init() {
    renderMenu();
  }
  function renderMenu() {
    ajax("/menu", 'GET', null, (function(res) {
      $('#menu-container').empty().append(res);
    }));
  }
})();

//# sourceMappingURL=menu.map
