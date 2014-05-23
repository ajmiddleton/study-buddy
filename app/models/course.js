var courses = global.nss.db.collection('courses');
var Mongo = require('mongodb');

class Course{
  constructor(teacherId, name){
    this.teacherId = Mongo.ObjectID(teacherId);
    this.name = name;
  }

  static create(teacherId, name, fn){
    var c = new Course(teacherId, name);
    courses.save(c, ()=>fn(c));
  }

  static findByUser(userId, fn){
    userId = Mongo.ObjectID(userId);
    courses.find({teacherId:userId}).toArray((err,records)=>{
      fn(records);
    });
  }
}

module.exports = Course;
