var express = require('express');
var path = require('path');
var router = express.Router();
var user = require('../models/users');

/* GET home page. */
router.post('/', function(req, res, next) {
  var pwd1;
  var uname = req.body.uname;
  var pwd = req.body.pwd;
  //console.log(uname);
  //console.log(pwd);
  if(uname=='admin')
  {
      user.find({'u_name': uname},function(err, teams) {
      if (err) {
        console.log(err);
      } else {
        //console.log(teams);
        pwd1 = teams[0].u_pass;
      }
      if(pwd == pwd1)
      res.sendFile('admin.html', {
         root: path.join(__dirname, '../')
      });
      else
      res.sendFile('error.html', {
        root: path.join(__dirname, '../')
     });

      });
      //console.log(pwd1);
      
      
  }
  else
  res.sendFile('student.html', {
    root: path.join(__dirname, '../')
  //console.log(fname);
  });
  
});

module.exports = router;
