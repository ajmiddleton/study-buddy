'use strict';

var traceur = require('traceur');
var Course = traceur.require(__dirname + '/../models/course.js');

exports.new = (req, res)=>{
  res.render('courses/new', {title: 'New Course'});
};

exports.index = (req, res)=>{
  Course.findByUser(req.session.userId, courses=>{
    res.render('courses/index', {courses:courses});
  });
};

exports.create = (req, res)=>{
  Course.create(req.session.userId, req.body.name, ()=>{
    Course.findByUser(req.session.userId, courses=>{
      console.log(courses);
      res.render('courses/index', {courses:courses});
    });
  });
};
