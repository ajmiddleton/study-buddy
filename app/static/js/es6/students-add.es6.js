/* global ajax */
/* jshint unused: false */

(function(){
  'use strict';

  $('#addStudents').click(addStudents);

  function addStudents(event){
    var courseId = $(this).attr('data-id');
    ajax(`/courses/${courseId}/students/add`, 'get', null, res=>{
      $('#content-container').empty().append(res);
    });

    event.preventDefault();
  }
})();
