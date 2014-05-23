(function() {
  'use strict';
  $('#submitNewCourse').click(submit);
  function submit(event) {
    var data = $('#new-course').serialize();
    ajax('/courses', 'post', data, (function(res) {
      $('#content-container').empty().append(res);
    }));
    event.preventDefault();
  }
})();

//# sourceMappingURL=courses-new.map
