/* global ajax */
/* jshint unused:false */
(function(){
  'use strict';

  $('.course').click(showCourse);
  $('.add-students').click(addStudents);

  function addStudents(){
    var data = $('#students').serialize();
    var courseId = $('.course').attr('data-id');
    ajax(`/courses/${courseId}/students/add`, 'put', data, res=>{
      $('#content-container').empty().append(res);
    });
  }

  function showCourse(){
    var courseId = $(this).attr('data-id');
    ajax(`/courses/${courseId}`, 'get', null, res=>{
      $('#content-container').empty().append(res);
    });
  }
})();
