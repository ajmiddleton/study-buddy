(function() {
  'use strict';
  $('.course').click(showCourse);
  $('.submit-test').click(submitTest);
  function submitTest() {
    var data = $('#test').serialize();
    var testId = $(this).attr('data-id');
    ajax(("/tests/" + testId + "/score"), 'post', data, (function(res) {
      alert(("You scored a " + res.score));
      showCourse();
    }), 'json');
  }
  function showCourse() {
    var courseId = $('.course').attr('data-id');
    ajax(("/courses/" + courseId), 'get', null, (function(res) {
      $('#content-container').empty().append(res);
    }));
  }
})();

//# sourceMappingURL=tests-show.map
