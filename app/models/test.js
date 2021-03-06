/* jshint unused:false */

var tests = global.nss.db.collection('tests');
var Mongo = require('mongodb');
var _ = require('lodash');

class Test{
  constructor(teacherId, courseId, title){
    this.title = title;
    this.teacherId = teacherId;
    this.courseId = courseId;
  }

  static findById(testId, fn){
    testId = Mongo.ObjectID(testId);
    tests.findOne({_id:testId}, (e, test)=>{
      test = _.create(Test.prototype, test);
      fn(test);
    });
  }

  static findByTeacher(teacherId, fn){
    teacherId = Mongo.ObjectID(teacherId);
    tests.find({teacherId:teacherId}).toArray((e, records)=>{
      fn(records);
    });
  }

  static findByCourse(courseId, fn){
    courseId = Mongo.ObjectID(courseId);
    tests.find({courseId:courseId}).toArray((e, records)=>{
      fn(records);
    });
  }

  static create(teacherId, courseId, title,  fn){
    teacherId = Mongo.ObjectID(teacherId);
    courseId = Mongo.ObjectID(courseId);
    var t = new Test(teacherId, courseId, title);
    tests.save(t, ()=>fn(t));
  }

  static removeById(testId, fn){
    testId = Mongo.ObjectID(testId);
    tests.remove({_id:testId}, ()=>fn());
  }
}

module.exports = Test;
