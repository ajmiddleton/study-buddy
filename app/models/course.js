var courses = global.nss.db.collection('courses');
var Mongo = require('mongodb');
var _ = require('lodash');

class Course{
  constructor(teacherId, name){
    this.teacherId = Mongo.ObjectID(teacherId);
    this.name = name;
    this.studentIds = [];
    this.videos = [];
  }

  static create(teacherId, name, fn){
    var c = new Course(teacherId, name);
    courses.save(c, ()=>fn(c));
  }

  static findByTeacher(teacherId, fn){
    teacherId = Mongo.ObjectID(teacherId);
    courses.find({teacherId:teacherId}).toArray((err,records)=>{
      records = records.map(course=>_.create(Course.prototype, course));
      fn(records);
    });
  }

  static findByStudent(studentId, fn){
    studentId = Mongo.ObjectID(studentId);
    courses.find({studentIds: {$elemMatch:studentId}}).toArray((err, records)=>{
      records = records.map(course=>_.create(Course.prototype, course));
      fn(records);
    });
  }

  static findById(courseId, fn){
    courseId = Mongo.ObjectID(courseId);
    courses.findOne({_id:courseId}, (e, course)=>{
      course = _.create(Course.prototype, course);
      fn(course);
    });
  }

  addVideo(formData, fn){
    var obj = {};
    obj.title = formData.title;
    obj.link = formData.link;
    this.videos.push(obj);
    courses.save(this, ()=>fn(this));
  }

  removeVideoByTitle(title, fn){
    this.videos = _.reject(this.videos, {title:title});
    courses.save(this, ()=>fn(this));
  }

  addStudents(studentIds, fn){
    studentIds = studentIds.map(studentId=>Mongo.ObjectID(studentId));
    this.studentIds.concat(studentIds);
    courses.save(this, ()=>fn(this));
  }
}

module.exports = Course;
