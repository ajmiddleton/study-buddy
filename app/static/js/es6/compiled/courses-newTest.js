(function() {
  'use strict';
  $('.course').click(showCourse);
  $('.add-question').click(addQuestion);
  $('.submit-test').click(submitTest);
  function submitTest() {
    labelCheckBoxes();
    var data = $('#newTest').serialize();
    var courseId = $('.course').attr('data-id');
    ajax(("/courses/" + courseId + "/test/create"), 'post', data, (function(res) {
      ajax(("/courses/" + courseId), 'get', null, (function(res) {
        $('#content-container').empty().append(res);
      }));
    }));
  }
  function labelCheckBoxes() {
    var questions = $('.question').toArray();
    questions.forEach((function(q, i) {
      var answers = $(q).find('.answer').toArray();
      answers.forEach((function(a, j) {
        $(a).find('[type=checkbox]').attr('value', (i + "-" + j));
      }));
    }));
  }
  function addQuestion() {
    $($('.question')[0]).clone().appendTo('#newTest');
  }
  function showCourse() {
    var courseId = $(this).attr('data-id');
    ajax(("/courses/" + courseId), 'get', null, (function(res) {
      $('#content-container').empty().append(res);
    }));
  }
})();

//# sourceMappingURL=courses-newTest.map
