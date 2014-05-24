var courses = global.nss.db.collection('courses');
var Mongo = require('mongodb');

class Course{
  constructor(teacherId, name){
    this.teacherId = Mongo.ObjectID(teacherId);
    this.name = name;
    this.studentIds = [];
    this.testIds = [];
    this.videos = [];
  }

  static create(teacherId, name, fn){
    var c = new Course(teacherId, name);
    courses.save(c, ()=>fn(c));
  }

  static findByTeacher(teacherId, fn){
    teacherId = Mongo.ObjectID(teacherId);
    courses.find({teacherId:teacherId}).toArray((err,records)=>{
      fn(records);
    });
  }

  static findByStudent(studentId, fn){
    studentId = Mongo.ObjectID(studentId);
    courses.find({studentIds: {$elemMatch:studentId}}).toArray((err, records)=>{
      fn(records);
    });
  }

  static findById(courseId, fn){
    courseId = Mongo.ObjectID(courseId);
    courses.findOne({_id:courseId}, (e, course)=>{
      fn(course);
    });
  }
}

module.exports = Course;
