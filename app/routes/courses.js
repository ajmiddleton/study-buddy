'use strict';

var traceur = require('traceur');
var Course = traceur.require(__dirname + '/../models/course.js');

exports.new = (req, res)=>{
  req.session.lastPage = '/courses/new';
  res.render('courses/new', {title: 'New Course'});
};

exports.index = (req, res)=>{
  req.session.lastPage = '/courses';
  Course.findByTeacher(req.session.userId, courses=>{
    res.render('courses/index', {courses:courses});
  });
};

exports.create = (req, res)=>{
  Course.create(req.session.userId, req.body.name, ()=>{
    Course.findByTeacher(req.session.userId, courses=>{
      res.render('courses/index', {courses:courses});
    });
  });
};

exports.show = (req, res)=>{
  req.session.lastPage = `/courses/${req.params.courseId}`;
  Course.findById(req.params.courseId, course=>{
    res.render('courses/show', {course:course});
  });
};

exports.newVideo = (req, res)=>{
  req.session.lastPage = `/courses/${req.params.courseId}/newVideo`;
  Course.findById(req.params.courseId, course=>{
    res.render('courses/newVideo', {course:course});
  });
};

exports.createVideo = (req, res)=>{
  Course.findById(req.params.courseId, course=>{
    course.addVideo(req.body, c=>res.render('courses/show', {course:c}));
  });
};

exports.newTest = (req, res)=>{
  req.session.lastPage = `/courses/${req.params.courseId}/test/new`;
  Course.findById(req.params.courseId, course=>{
    res.render('courses/newTest', {course:course});
  });
};

exports.addStudents = (req, res)=>{
  req.session.lastPage = `/courses/${req.params.courseId}/students/add`;
  Course.findById(req.params.courseId, course=>{
    res.render('courses/addStudents', {course:course});
  });
};
