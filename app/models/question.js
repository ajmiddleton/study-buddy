/* jshint unused:false */

var questions = global.nss.db.collection('questions');
var Mongo = require('mongodb');

class Question{
  constructor(teacherId, testId, text, answers){
    this.teacherId = teacherId;
    this.testId = testId;
    this.text = text;
    this.answers = answers;
  }

  static findById(questionId, fn){
    questionId = Mongo.ObjectID(questionId);
    questions.findOne({_id:questionId}, (e, question)=>{
      fn(question);
    });
  }

  static findByTestId(testId, fn){
    testId = Mongo.ObjectID(testId);
    questions.find({testId:testId}).toArray((e, records)=>{
      fn(records);
    });
  }

  create(teacherId, testId, text, answers, fn){
    var q = new Question(teacherId, testId, text, answers);
    questions.save(q, ()=>fn(q));
  }

  save(fn){
    questions.save(this, ()=>fn(this));
  }
}

module.exports = Question;
