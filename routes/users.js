var express = require('express');
var path = require('path');
var router = express.Router();
const user = require('../models/users');
const deptDetails = require('../models/dept');
const comtype = require('../models/comtype');
const complaints = require('../models/complaints');
const studentdetails = require('../models/studentdetails');
const announcements=require('../models/announcements');
const UserSchema = require('../models/users');
const Comment = require('../models/comment');
const session = require('express-session');
const sgmail = require("@sendgrid/mail");
var fs = require('fs');
var bodyParser = require('body-parser');
var multer = require('multer');

var app = express();
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
 
// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       cb(null, 'uploads')
//   },
//   filename: (req, file, cb) => {
//     //console.log(file);
//       cb(null, file.fieldname + '-' + Date.now())
//   }
// });

// var upload = multer({ storage: storage });
//var sg = require('@sendgrid/mail')('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');
//process.env.a=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;
const dotenv = require('dotenv');
const { db } = require('../models/users');
dotenv.config();
//console.log("Your port is"+ process.env.SENDGRID_API_KEY);
//sg=require('./SENDGRID_API_KEY');
//console.log("Your port is"+ sg);
sgmail.setApiKey(process.env.SENDGRID_API_KEY);

/* GET home page. */
var deptname,student_uname,dept_name,comp_type,year,detailss,image;
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
                announcements.find(function (err, announces){
               comtype.find(function (err, complaints) {
                console.log(detailss);
                res.render('student', {
                  announces:announces,
                  complaints: complaints,
                  detailss:detailss,
                  deptname:deptname,
                   year:year,
                  student_uname:student_uname,
                });
      
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
      const msg = {
        to:"sgsnode@yopmail.com",
        from:"dddnode@yopmail.com",
        subject:"complaint created",
        text:"complaint in "+deptname+"-"+req.body.ctype,
      };
      sgmail
    .send(msg)
      .then(() => {
      console.log('Email sent')
         })
   .catch((error) => {
  console.error(error)
         })

      //move to the student.html page after registering the complaint(not working)
      complaints.find({ 'stud_uname': student_uname }, function (err, detailss) {
        if (err) {
          console.log(err);
        }
        else {
          detailss=detailss;
         // console.log(detailss);
         announcements.find(function (err, announces){
         comtype.find(function (err, complaints) {
          console.log(detailss);
          res.render('student', {
            announces:announces,
            complaints: complaints,
            detailss:detailss,
            deptname:deptname,
             year:year,
            student_uname:student_uname,
          });

        });
      });
        }
      });
  });



});


// router.post('/comptypes', function (req, res, next) {
//   var dept_name = req.body.dept_name;
  
//   comtype.find(function (err, comtype) {
//       res.render('comptype', {
//       comtype: comtype,
//       dept_name: dept_name
//     }
//     );
 
//   });


// });
router.post('/complaints', function (req, res, next) {
   dept_name = req.body.dept_name;
   //comp_type = req.body.comp_type;
  //var a=req.session.d_name;
  //req.session.d_name=dept_name;
  //req.session['c_name']=comp_type;
  complaints.find({ 'dept_name': dept_name }, function (err, complaint) {
    res.render('complaints', {
      dept_name: dept_name,
      complaint: complaint
    }
    );
  });


});
router.post('/check_status', function (req, res, next) {
  var c_id = req.body.btn;
  var c1_id = req.body.btn1;
  var c,status;
  if (c_id == undefined)
  {
  var myquery = { _id: c1_id };
  var newvalues = { $set: {comp_status:"reject"} };
  c=c1_id;
  status="rejected";
  console.log(c);
  }
  else
  {
    var myquery = { _id: c_id };
    var newvalues = { $set: {comp_status:"solved"} };
    c=c_id; 
    status="resolved";
    console.log(c);
  }
  complaints.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    //db.close();
  });
  complaints.find({ '_id': c }, function (err, detailss) {
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
                            text:"complaint "+status,
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
  complaints.find({ 'dept_name': dept_name }, function (err, complaint) {
    res.render('complaints', {
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
  // var paths = 'D:/SGS' + '/uploads/' + req.file.filename;
  // console.log(req.file.filename);
  // //console.log('D:/SGS' + '/uploads/' + req.file.filename);
  var newstudent = { student_name:s_name, student_uname:s_uname,student_pass: s_pass,dept_name:s_dept,year:s_year,email:s_email}
  
  studentdetails.create(newstudent);
  var stud = {u_name:s_name,u_pass:s_pass,is_admin:false};
  UserSchema.create(stud);
  deptDetails.find(function (err, depts) {
    res.render('admin', {
      depts: depts
    });
  });
    
  

});
router.post('/addannoucement', function (req, res, next) {
  var splittime = Date();
  splittime=splittime.slice(0,15);
  var newannounce = {reg_title:req.body.reg_anc,announcement:req.body.anc,addtime:splittime};
  announcements.create(newannounce);
  deptDetails.find(function (err, depts) {
    res.render('admin', {
      depts: depts
    });
  });
});
router.post('/addcomments', async function (req, res, next) {
  var user = req.body.user;
  var com = req.body.com;
  var id = req.body.ids;
  var comment,c_id;
  var complaint = await complaints.findOne({_id:id});
  //console.log(id + user + com);
  complaint.comments.push({
    username: user, text: com
  });
  //console.log(complaint)
  await complaint.save();
  if(user=="admin")
  {
    complaints.find({ 'dept_name': dept_name }, function (err, complaint) {
      res.render('complaints', {
        dept_name: dept_name,
        complaint: complaint
      }
      );
    });
  
  }
  else
  {
    studentdetails.find({ 'student_uname': user }, function (err, details) {
      if (err) {
        console.log(err);
      }
      else {
        deptname = details[0].dept_name;
        student_uname = details[0].student_uname;
        year = details[0].year;
        complaints.find({ 'stud_uname': user }, function (err, detailss) {
          if (err) {
            console.log(err);
          }
          else {
            detailss=detailss;
            announcements.find(function (err, announces){
           comtype.find(function (err, complaints) {
            console.log(detailss);
            res.render('student', {
              announces:announces,
              complaints: complaints,
              detailss:detailss,
              deptname:deptname,
               year:year,
              student_uname:student_uname,
            });
  
          });
        });
          }
        });
      }
    });
    
  }

  //Comment.create(comment);
  //var c_id = Comment.find({'username':username,'text':com},{projection :{_id:1}});
  // Comment.find({},function(err, docs) {
  //   console.log(docs[0]);
  //   console.log(docs[0]._id);
  //   c_id=docs[0]._id;
  //   complaints.findOneAndUpdate({_id:id },  
  //     {comment:c_id}, null, function (err, docss) { 
  //     if (err){ 
  //         console.log(err) 
  //     } 
  //     else{ 
  //         console.log("Original Doc : ",docss); 
  //     } 
  // }); 
  // });
  // //console.log(c_id);
 // complaints.findOneAndUpdate({'_id':id},{comment:c_id})
  
  

});


module.exports = router;