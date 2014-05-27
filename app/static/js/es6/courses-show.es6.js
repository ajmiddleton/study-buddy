/* jshint unused:false */
/* global ajax */

(function(){
  'use strict';

  $('#addVideo').click(addVideo);
  $('#addTest').click(addTest);
  $('#addStudents').click(addStudents);
  $('.remove-video').click(removeVideo);
  $('.showVideo').click(showVideo);

  function removeVideo(){
    var title = $(this).attr('data-title');
    var courseId = $('#course').attr('data-id');
    ajax(`/courses/${courseId}/video`, 'delete', {title:title}, res=>{
      $('#content-container').empty().append(res);
    });
  }

  function addVideo(){
    var courseId = $('#course').attr('data-id');
    ajax(`/courses/${courseId}/newVideo`, 'get', null, res=>{
      $('#content-container').empty().append(res);
    });
  }

  function addTest(event){
    var courseId = $(this).attr('data-id');
    ajax(`/courses/${courseId}/test/new`, 'get', null, res=>{
      $('#content-container').empty().append(res);
    });

    event.preventDefault();
  }

  function addStudents(event){
    var courseId = $(this).attr('data-id');
    ajax(`/courses/${courseId}/students/add`, 'get', null, res=>{
      $('#content-container').empty().append(res);
    });

    event.preventDefault();
  }

  function showVideo(){
    var courseId = $(this).attr('data-id');
    var link = $(this).attr('data-url');
    ajax(`/courses/${courseId}/showVideo`, 'get', {link:link}, res=>{
      $('#content-container').empty().append(res);
    });
  }

})();
