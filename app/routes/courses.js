'use strict';

var traceur = require('traceur');
var Course = traceur.require(__dirname + '/../models/course.js');
var User = traceur.require(__dirname + '/../models/user.js');

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

exports.destroyVideo = (req, res)=>{
  Course.findById(req.params.courseId, course=>{
    course.removeVideoByTitle(req.body.title, c=>res.render('courses/show', {course:c}));
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
    User.findAllStudents(students=>{
      res.render('courses/addStudents', {course:course, students:students});
    });
  });
};
