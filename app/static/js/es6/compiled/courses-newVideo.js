(function() {
  'use strict';
  $('#course').click(showCourse);
  $('#submit-video-form').click(submitVideo);
  function submitVideo() {
    var courseId = $('#course').attr('data-id');
    var data = $('#video-form').serialize();
    ajax(("/courses/" + courseId + "/video"), 'post', data, (function(res) {
      $('#content-container').empty().append(res);
    }));
  }
  function showCourse() {
    var courseId = $(this).attr('data-id');
    ajax(("/courses/" + courseId), 'get', null, (function(res) {
      $('#content-container').empty().append(res);
    }));
  }
})();

//# sourceMappingURL=courses-newVideo.map
