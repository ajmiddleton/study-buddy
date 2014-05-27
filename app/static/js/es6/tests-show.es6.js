/* global ajax */
/* jshint unused:false */

(function(){
  'use strict';

  $('.course').click(showCourse);

  function showCourse(){
    var courseId = $(this).attr('data-id');
    ajax(`/courses/${courseId}`, 'get', null, res=>{
      $('#content-container').empty().append(res);
    });
  }
})();
