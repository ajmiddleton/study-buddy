/* global ajax */
(function(){
  'use strict';

  $('#submitNewCourse').click(submit);

  function submit(event){
    var data = $('#new-course').serialize();
    ajax('/courses', 'post', data, res=>{
      $('#content-container').empty().append(res);
    });

    event.preventDefault();
  }
})();
