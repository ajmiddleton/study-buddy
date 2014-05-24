var users = global.nss.db.collection('users');
var Mongo = require('mongodb');
var bcrypt = require('bcrypt');
var _ = require('lodash');

class User{
  constructor(formData){
    this.email = formData.email;
    this.password = bcrypt.hashSync(formData.password, 8);
    this.type = formData.accType;
  }

  static create(formData, fn){
    User.findByEmail(formData.email, user=>{
      if(user){
        fn(null);
      }else{
        var u = new User(formData);
        users.save(u, ()=>fn(u));
      }
    });

  }

  get isStudent(){
    return this.type === 'student';
  }

  get isTeacher(){
    return this.type === 'teacher';
  }

  login(fn){
    User.findByEmail(this.email, user=>{
      if(user){
        var isMatch = bcrypt.compareSync(this.password, user.password);
        if(isMatch){
          fn(user);
        }
      }else{
        fn(null);
      }
    });
  }

  static findByEmail(email, fn){
    users.findOne({email:email}, (e, user)=>{
      if(user){
        user = _.create(User.prototype, user);
        fn(user);
      }else{
        fn(null);
      }
    });
  }

  static findById(userId, fn){
    userId = Mongo.ObjectID(userId);
    users.findOne({_id:userId}, (e, user)=>{
      if(user){
        user = _.create(User.prototype, user);
        fn(user);
      }else{
        fn(null);
      }
    });
  }

}

module.exports = User;
