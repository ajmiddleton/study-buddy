(function() {
  'use strict';
  $('.course').click(showCourse);
  function showCourse() {
    var courseId = $(this).attr('data-id');
    ajax(("/courses/" + courseId), 'get', null, (function(res) {
      $('#content-container').empty().append(res);
    }));
  }
})();

//# sourceMappingURL=tests-show.map
