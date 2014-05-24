/* global ajax */
(function(){
  'use strict';

  $('#menu-courses').click(getCourses);
  $('#menu-new-course').click(getNewCourse);

  function getCourses(){
    ajax('/courses', 'get', null, res=>{
      $('#content-container').empty().append(res);
    });
  }

  function getNewCourse(){
    ajax('/courses/new', 'get', null, res=>{
      $('#content-container').empty().append(res);
    });
  }
})();
