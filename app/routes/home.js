'use strict';

exports.index = (req, res)=>{
  res.render('shared/template', {title: 'Study Buddy'});
};

exports.lastPage = (req, res)=>{
  if(req.session.lastPage){
    res.send({status: 1, lastPage:req.session.lastPage});
  }else{
    res.send({status: 0});
  }
};
