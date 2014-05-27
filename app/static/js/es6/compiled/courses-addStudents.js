(function() {
  'use strict';
  $('.course').click(showCourse);
  $('.add-students').click(addStudents);
  function addStudents() {
    var data = $('#students').serialize();
    var courseId = $('.course').attr('data-id');
    ajax(("/courses/" + courseId + "/students/add"), 'put', data, (function(res) {
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

//# sourceMappingURL=courses-addStudents.map
