(function() {
  'use strict';
  $('#addTest').click(addTest);
  function addTest(event) {
    var courseId = $(this).attr('data-id');
    ajax(("/courses/" + courseId + "/test/new"), 'get', null, (function(res) {
      $('#content-container').empty().append(res);
    }));
    event.preventDefault();
  }
})();

//# sourceMappingURL=tests-new.map
