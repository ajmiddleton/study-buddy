/* jshint unused:false */

var tests = global.nss.db.collection('tests');
var Mongo = require('mongodb');

class Test{
  constructor(teacherId, tags){
    this.teacherId = teacherId;
    this.tags = tags;
  }

  static findById(testId, fn){
    testId = Mongo.ObjectID(testId);
    tests.findOne({_id:testId}, (e, test)=>{
      fn(test);
    });
  }

  static findByTeacher(teacherId, fn){
    teacherId = Mongo.ObjectID(teacherId);
    tests.find({teacherId:teacherId}).toArray((e, records)=>{
      fn(records);
    });
  }

  create(formData, fn){
    var t = new Test(formData.teacherId, formData.tags);
    tests.save(t, ()=>fn(t));
  }
}
