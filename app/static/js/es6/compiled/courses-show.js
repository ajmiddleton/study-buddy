(function() {
  'use strict';
  $('#course-add-video').click(addVideo);
  function addVideo() {
    var courseId = $('#course').attr('data-id');
    ajax(("/courses/" + courseId + "/newVideo"), 'get', null, (function(res) {
      $('#content-container').empty().append(res);
    }));
  }
})();

//# sourceMappingURL=courses-show.map
