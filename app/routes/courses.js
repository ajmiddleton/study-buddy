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
