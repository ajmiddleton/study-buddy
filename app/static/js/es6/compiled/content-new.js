(function() {
  'use strict';
  $('#addContent').click(submit);
  function submit(event) {
    var courseId = $(this).attr('data-id');
    ajax(("/courses/" + courseId + "/content/new"), 'get', null, (function(res) {
      $('#content-container').empty().append(res);
    }));
    event.preventDefault();
  }
})();

//# sourceMappingURL=content-new.map
