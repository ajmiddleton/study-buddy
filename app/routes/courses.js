/* jshint unused:false */
'use strict';

var traceur = require('traceur');
var Course = traceur.require(__dirname + '/../models/course.js');
var User = traceur.require(__dirname + '/../models/user.js');
var Test = traceur.require(__dirname + '/../models/test.js');
var Question = traceur.require(__dirname + '/../models/question.js');
var Mongo = require('mongodb');
var _ = require('lodash');

exports.new = (req, res)=>{
  req.session.lastPage = '/courses/new';
  res.render('courses/new', {title: 'New Course'});
};

exports.index = (req, res)=>{
  req.session.lastPage = '/courses';

  User.findById(req.session.userId, user=>{
    if(user.isTeacher){
      Course.findByTeacher(req.session.userId, courses=>{
        res.render('courses/index', {courses:courses});
      });
    }else{
      Course.findByStudent(req.session.userId, courses=>{
        res.render('courses/index', {courses:courses});
      });
    }
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
  User.findById(req.session.userId, user=>{
    Course.findById(req.params.courseId, course=>{
      Test.findByCourse(course._id, tests=>{
        res.render('courses/show', {course:course, tests:tests, user:user});
      });
    });
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

exports.assignStudents = (req, res)=>{
  Course.findById(req.params.courseId, course=>{
    course.addStudents(req.body.students, c=>{
      res.send({status:1});
    });
  });
};

exports.createTest = (req, res)=>{
  Test.create(req.session.userId, req.params.courseId, req.body.testName, test=>{
    var questions = _([req.body.questionText]).flatten();
    questions.forEach((question, i)=>{
      var q = {};
      q.text = question;
      q.answers = _([req.body.answerText]).flatten().slice(i*4, (i*4)+4).valueOf();
      q.answers = q.answers.map((answer, j)=>{
        var temp = {};
        temp.text = answer;
        temp.isCorrect = false;
        _([req.body.correctAnswer]).flatten().forEach(pair=>{
          pair = pair.split('-').map(n=>n*1);
          if(i === pair[0] && j === pair[1]){
            temp.isCorrect = true;
          }
        });
        return temp;
      });
      q.teacherId = Mongo.ObjectID(req.session.userId);
      q.testId = test._id;
      q = _.create(Question.prototype, q);
      q.save(()=>{});
    });
    res.send({status:1});
  });
};
