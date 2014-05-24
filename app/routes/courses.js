'use strict';

var traceur = require('traceur');
var Course = traceur.require(__dirname + '/../models/course.js');

exports.new = (req, res)=>{
  res.render('courses/new', {title: 'New Course'});
};

exports.index = (req, res)=>{
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
  Course.findById(req.params.courseId, course=>{
    res.render('courses/show', {course:course});
  });
};

exports.newContent = (req, res)=>{
  Course.findById(req.params.courseId, course=>{
    res.render('courses/newContent', {course:course});
  });
};

exports.newTest = (req, res)=>{
  Course.findById(req.params.courseId, course=>{
    res.render('courses/newTest', {course:course});
  });
};

exports.addStudents = (req, res)=>{
  Course.findById(req.params.courseId, course=>{
    res.render('courses/addStudents', {course:course});
  });
};
