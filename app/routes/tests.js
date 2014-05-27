/* jshint unused:false */
'use strict';
var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');
var Course = traceur.require(__dirname + '/../models/course.js');
var Test = traceur.require(__dirname + '/../models/test.js');
var Question = traceur.require(__dirname + '/../models/question.js');
var _ = require('lodash');

exports.show = (req, res)=>{
  Test.findById(req.params.testId, test=>{
    Course.findById(test.courseId, course=>{
      Question.findByTestId(req.params.testId, questions=>{
        res.render('tests/show', {course:course, test:test, questions:questions});
      });
    });
  });
};

exports.destroy = (req, res)=>{
  Test.removeById(req.params.testId, ()=>res.send({status:1}));
};

exports.score = (req, res)=>{
  var answers = [];
  _([req.body.answers]).flatten().forEach(answer=>{
    var temp = {};
    temp.qId = answer.split('-')[0];
    temp.text = answer.split('-')[1];
    answers.push(temp);
  });
  Test.findById(req.params.testId, test=>{
    Question.findByTestId(req.params.testId, questions=>{
      questions.forEach(question=>{
        question.isCorrect = true;
        question.falseCount = 0;
        question.answers.forEach(a=>{
          var fi = _.findIndex(answers, {text:a.text});
          if(a.isCorrect && fi < 0){
            question.isCorrect = false;
          }
          if(!a.isCorrect && fi > -1){
            question.falseCount++;
          }
        });
      });
      var numCorrect = 0;
      questions.forEach(question=>{
        if(question.isCorrect && question.falseCount ===0){
          numCorrect++;
        }
      });
      var percent = (numCorrect / questions.length)*100;
      User.findById(req.session.userId, user=>{
        user.scores.push({testId:req.params.testId, score:percent});
        user.save(()=>res.send({score:percent}));
      });
    });
  });
};
