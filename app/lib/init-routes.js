/* jshint unused:false */
'use strict';

var traceur = require('traceur');
var dbg = traceur.require(__dirname + '/route-debugger.js');
var initialized = false;

module.exports = (req, res, next)=>{
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var home = traceur.require(__dirname + '/../routes/home.js');
  var users = traceur.require(__dirname + '/../routes/users.js');
  var courses = traceur.require(__dirname + '/../routes/courses.js');

  app.get('/', dbg, home.index);

  app.get('/users/new', dbg, users.new);
  app.post('/users', dbg, users.create);
  app.get('/login', dbg, users.renderLogin);
  app.post('/login', dbg, users.login);
  app.get('/logout', dbg, users.logout);
  app.get('/menu', dbg, users.renderMenu);

  app.get('/courses/new', dbg, courses.new);
  app.get('/courses', dbg, courses.show);
  app.post('/courses', dbg, courses.create);


  console.log('Routes Loaded');
  fn();
}
