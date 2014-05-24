/* global ajax */
/* jshint unused:false */

(function(){
  'use strict';

  $('#addContent').click(submit);

  function submit(event){
    var courseId = $(this).attr('data-id');
    ajax(`/courses/${courseId}/content/new`, 'get', null, res=>{
      $('#content-container').empty().append(res);
    });

    event.preventDefault();
  }
})();
