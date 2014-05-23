/* jshint unused:false */
'use strict';

var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');

exports.new = (req, res)=>{
  res.render('users/new');
};

exports.renderLogin = (req, res)=>{
  User.findById(req.session.userId, user=>{
    res.render('users/login', {user:user});
  });
};

exports.create = (req, res)=>{
  User.create(req.body, user=>{
    if(user){
      req.session.userId = user._id;
      res.render('users/login', {user:user}, (e, loginHTML)=>{res.send({status:1, loginHTML:loginHTML});});
    }else{
      req.session.userId = null;
      res.send({status:0});
    }
  });
};

exports.login = (req, res)=>{
  var user = new User(req.body);
  user.login(u=>{
    if(u){
      req.session.userId = u._id;
      res.render('users/login', {user:u}, (e, loginHTML)=>{res.send({status:1, loginHTML:loginHTML});});
    }else{
      req.session.userId = null;
      res.send({status:0});
    }
  });
};

exports.logout = (req, res)=>{
  req.session = null;
  res.render('users/login', {user:null}, (e, loginHTML)=>{res.send({status:1, loginHTML:loginHTML});});
};
