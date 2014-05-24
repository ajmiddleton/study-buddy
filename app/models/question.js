/* jshint unused:false */

var questions = global.nss.db.collection('questions');
var Mongo = require('mongodb');

class Question{
  constructor(teacherId, testId, text, answers, tags){
    this.teacherId = teacherId;
    this.testId = testId;
    this.text = text;
    this.answers = answers;
    this.tags = tags;
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

  create(formData, fn){
    var q = new Question(formData.teacherId, formData.testId, formData.text, formData.answers, formData.tags);
    questions.save(q, ()=>fn(q));
  }
}

module.exports = Question;
