(function() {
  'use strict';
  $('#addVideo').click(addVideo);
  $('#addTest').click(addTest);
  $('#addStudents').click(addStudents);
  function addVideo() {
    var courseId = $('#course').attr('data-id');
    ajax(("/courses/" + courseId + "/newVideo"), 'get', null, (function(res) {
      $('#content-container').empty().append(res);
    }));
  }
  function addTest(event) {
    var courseId = $(this).attr('data-id');
    ajax(("/courses/" + courseId + "/test/new"), 'get', null, (function(res) {
      $('#content-container').empty().append(res);
    }));
    event.preventDefault();
  }
  function addStudents(event) {
    var courseId = $(this).attr('data-id');
    ajax(("/courses/" + courseId + "/students/add"), 'get', null, (function(res) {
      $('#content-container').empty().append(res);
    }));
    event.preventDefault();
  }
})();

//# sourceMappingURL=courses-show.map
