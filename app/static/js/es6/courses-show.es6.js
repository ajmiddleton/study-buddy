/* jshint unused:false */
/* global ajax */

(function(){
  'use strict';

  $('#addVideo').click(addVideo);
  $('#addTest').click(addTest);
  $('#addStudents').click(addStudents);
  $('.remove-video').click(removeVideo);
  $('.test-link').click(showTest);
  $('.showVideo').click(showVideo);
  $('.remove-test').click(removeTest);

  function removeTest(){
    var testId = $(this).attr('data-id');
    var courseId = $('.course').attr('data-id');
    ajax(`/tests/${testId}`, 'delete', null, res=>{
      ajax(`/courses/${courseId}`, 'get', null, res=>{
        $('#content-container').empty().append(res);
      });
    });
  }

  function showTest(){
    var testId = $(this).attr('data-id');
    ajax(`/tests/${testId}`, 'get', null, res=>{
      $('#content-container').empty().append(res);
    });
  }

  function removeVideo(){
    var title = $(this).attr('data-title');
    var courseId = $('#course').attr('data-id');
    ajax(`/courses/${courseId}/video`, 'delete', {title:title}, res=>{
      ajax(`/courses/${courseId}`, 'get', null, res=>{
        $('#content-container').empty().append(res);
      });
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
