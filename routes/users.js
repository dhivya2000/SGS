var express = require('express');
var path = require('path');
var router = express.Router();
const user = require('../models/users');
const deptDetails = require('../models/dept');
const comtype = require('../models/comtype');
const complaints = require('../models/complaints');
const studentdetails = require('../models/studentdetails');
const UserSchema = require('../models/users');
const session = require('express-session');
const sgmail = require("@sendgrid/mail");
//var sg = require('@sendgrid/mail')('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');
//process.env.a=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;
const dotenv = require('dotenv');
dotenv.config();
//console.log("Your port is"+ process.env.SENDGRID_API_KEY);
//sg=require('./SENDGRID_API_KEY');
//console.log("Your port is"+ sg);
sgmail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to:"dddnode@yopmail.com",
  from:"ddddhivdhan@gmail.com",
  subject:"test",
  text:"hello world good day",
  html:"<strong>hello world good day</strong>"
};

/* GET home page. */
var deptname,student_uname,dept_name,comp_type,year,detailss;
router.post('/', function (req, res, next) {
  var pwd1;
  var uname = req.body.uname;
  var pwd = req.body.pwd;
  //var detailss;
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
            student_uname = details[0].student_uname;
            year = details[0].year;
            complaints.find({ 'stud_uname': uname }, function (err, detailss) {
              if (err) {
                console.log(err);
              }
              else {
                detailss=detailss;
               // console.log(detailss);
               comtype.find(function (err, complaints) {
                console.log(detailss);
                res.render('student', {
                  complaints: complaints,
                  detailss:detailss,
                  deptname:deptname,
                   year:year,
                  student_uname:student_uname,
                });
      
              });
      
              }
            });
          }
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
  //count=count+1;
  var newcomplaint = {comp_type: req.body.ctype, comp_desc: req.body.cdesc, dept_name: deptname ,stud_uname:student_uname};
  //console.log(student_uname);
  complaints.create(newcomplaint)
    .then((complaint) => {
      console.log('Created');
      //move to the student.html page after registering the complaint(not working)
      complaints.find({ 'stud_uname': student_uname }, function (err, detailss) {
        if (err) {
          console.log(err);
        }
        else {
          detailss=detailss;
         // console.log(detailss);
         comtype.find(function (err, complaints) {
          console.log(detailss);
          res.render('student', {
            complaints: complaints,
            detailss:detailss,
            deptname:deptname,
             year:year,
            student_uname:student_uname,
          });

        });

        }
      });
  });



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
   dept_name = req.body.dept_name;
   comp_type = req.body.comp_type;
  //var a=req.session.d_name;
  //req.session.d_name=dept_name;
  //req.session['c_name']=comp_type;
  complaints.find({ 'dept_name': dept_name, "comp_type": comp_type }, function (err, complaint) {
    res.render('complaints', {
      comp_type: comp_type,
      dept_name: dept_name,
      complaint: complaint
    }
    );
  });


});
router.post('/check_status', function (req, res, next) {
  var c_id = req.body.btn;
  var myquery = { _id: c_id };
  var newvalues = { $set: {comp_status:true} };
  
  complaints.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    //db.close();
  });
  complaints.find({ '_id': c_id }, function (err, detailss) {
              if (err) {
                console.log(err);
              }
              else {
                var stud_name=detailss[0].stud_uname;
                studentdetails.find({'student_name':stud_name},function(err,studdetail) {
                      if(err){
                        console.log(err);
                      }
                      else
                      {
                          var email=studdetail[0].email;
                          console.log(email);
                          const msg = {
                            to:email,
                            from:"dddnode@yopmail.com",
                            subject:"complaint",
                            text:"complaint resolved",
                          };
                          sgmail
                        .send(msg)
                          .then(() => {
                          console.log('Email sent')
                             })
                       .catch((error) => {
                      console.error(error)
                             })
                      }
                });
               
              
              }
    });
  complaints.find({ 'dept_name': dept_name, "comp_type": comp_type }, function (err, complaint) {
    res.render('complaints', {
      comp_type: comp_type,
      dept_name: dept_name,
      complaint: complaint
    }
    );
  });

});

router.post('/addStudent', function (req, res, next) {
  var s_name = req.body.s_name;
  var s_uname = req.body.s_uname;
  var s_pass = req.body.s_pass;
  var s_dept = req.body.s_dept;
  var s_year = req.body.s_year;
  var s_email =  req.body.s_email;
  var newstudent = { student_name:s_name, student_uname:s_uname,student_pass: s_pass,dept_name:s_dept,year:s_year,email:s_email};
  studentdetails.create(newstudent);
  var stud = {u_name:s_name,u_pass:s_pass,is_admin:false};
  UserSchema.create(stud);
  deptDetails.find(function (err, depts) {
    res.render('admin', {
      depts: depts
    });
  });
    
  

});

module.exports = router;