/* jshint unused:false */
'use strict';
var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');
var Course = traceur.require(__dirname + '/../models/course.js');
var Test = traceur.require(__dirname + '/../models/test.js');
var Question = traceur.require(__dirname + '/../models/question.js');

exports.show = (req, res)=>{
  Test.findById(req.params.testId, test=>{
    Course.findById(test.courseId, course=>{
      Question.findByTestId(req.params.testId, questions=>{
        res.render('tests/show', {course:course, test:test, questions:questions});
      });
    });
  });
};
