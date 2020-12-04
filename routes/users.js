var express = require('express');
var path = require('path');
var router = express.Router();
const user = require('../models/users');
const deptDetails = require('../models/dept');
const comtype = require('../models/comtype');
const complaints = require('../models/complaints');
const studentdetails = require('../models/studentdetails');

/* GET home page. */
var deptname;
router.post('/', function (req, res, next) {
  var pwd1;
  var uname = req.body.uname;
  var pwd = req.body.pwd;
  user.find({ 'u_name': uname }, function (err, teams) {
    if (err) {
      console.log(err);
    } else {
      pwd1 = teams[0].u_pass;
    }

    if (uname == 'admin') {
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
    }
    else {
      if (pwd == pwd1) {
        studentdetails.find({ 'student_uname': uname }, function (err, details) {
          if (err) {
            console.log(err);
          }
          else {
            deptname = details[0].dept_name;
          }
        });
        comtype.find(function (err, complaints) {
          res.render('student', {
            complaints: complaints
          });

        });

      }
      else {
        res.render('error');
      }

    }
  });
});




// router.get('/studentget', function (req, res, next) {
//   comtype.find(function (err, complaints) {
//     res.render('student', {
//       complaints: complaints
//     });
//   });

// });
router.post('/addcomplaint', function (req, res, next) {
  // var com_id;
  // console.log("start");
  // comtype.find({ 'comp_type': req.body.ctype }, function (err, complaint_type) {
  //   console.log("comtype");
  //   console.log(complaint_type[0].comp_id);
  //   com_id = complaint_type[0].comp_id;
  var newcomplaint = { comp_type: req.body.ctype, comp_desc: req.body.cdesc, dept_name: deptname };
  complaints.create(newcomplaint)
    .then((complaint) => {
      console.log('Created');
      //move to the student.html page after registering the complaint(not working)
      res.redirect("/");


    },

      (err) => next(err))
    .catch((err) => next(err));
  //console.log(err);




});


router.post('/comptypes', function (req, res, next) {
  var dept_name = req.body.dept_name;
  comtype.find(function (err, comtype) {
    res.render('comptype', {
      comtype: comtype,
      dept_name: dept_name
    }
    );
  });


});
router.post('/comptypes/complaints', function (req, res, next) {
  var dept_name = req.body.dept_name;
  var comp_type = req.body.comp_type;
  complaints.find({ 'dept_name': dept_name, "comp_type": comp_type }, function (err, complaint) {
    res.render('complaints', {
      comp_type: comp_type,
      dept_name: dept_name,
      complaint: complaint
    }
    );
  });


});

module.exports = router;
