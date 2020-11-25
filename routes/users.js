var express = require('express');
var path = require('path');
var router = express.Router();
const user = require('../models/users');
const deptDetails = require('../models/dept');

/* GET home page. */
router.post('/', function (req, res, next) {
  var pwd1;
  var uname = req.body.uname;
  var pwd = req.body.pwd;
  if (uname == 'admin') {
    user.find({ 'u_name': uname }, function (err, teams) {
      if (err) {
        console.log(err);
      } else {
        //console.log(teams);
        pwd1 = teams[0].u_pass;
      }

      if (pwd == pwd1) {
        deptDetails.find(function (err, depts) {
          res.render('admin', {
            depts: depts
          });
        });
      }
      else {
        res.render('error');
      }
    });
    //console.log(pwd1);


  }
  else
    res.render('student');

});

module.exports = router;
