/* jshint unused:false */
/* global ajax */

(function(){
  'use strict';

  $('#course-add-video').click(addVideo);

  function addVideo(){
    var courseId = $('#course').attr('data-id');
    ajax(`/courses/${courseId}/newVideo`, 'get', null, res=>{
      $('#content-container').empty().append(res);
    });
  }
})();
