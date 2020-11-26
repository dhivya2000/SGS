var express = require('express');
var path = require('path');
var router = express.Router();
const user = require('../models/users');
const deptDetails = require('../models/dept');
const comtype = require('../models/comtype');
const complaints = require('../models/complaints');


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
router.post('/comptypes', function (req, res, next) {
  var dept_name = req.body.dept_name;
  //console.log(dept_name);
  comtype.find(function (err, comtype) {
    res.render('comptype', {
      comtype:comtype,
      dept_name:dept_name
    }
    );
  }); 
  

});
router.post('/comptypes/complaints', function (req, res, next) {
  var dept_name = req.body.dept_name;
  //console.log(dept_name);
  var comp_type = req.body.comp_type;
  //console.log(comp_type);
  complaints.find({'dept_name':dept_name,"comp_type":comp_type},function (err, complaint) {
    res.render('complaints', {
      comp_type:comp_type,
      dept_name:dept_name,
      complaint:complaint
    }
    );
  }); 
  

});

module.exports = router;
