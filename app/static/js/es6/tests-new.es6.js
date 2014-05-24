/* global ajax */
/* jshint unused:false */

(function(){
  'use strict';

  $('#addTest').click(addTest);

  function addTest(event){
    var courseId = $(this).attr('data-id');
    ajax(`/courses/${courseId}/test/new`, 'get', null, res=>{
      $('#content-container').empty().append(res);
    });

    event.preventDefault();
  }
})();
