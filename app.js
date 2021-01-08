var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');
const usersDetails = require('./models/users');
const deptDetails = require('./models/dept');
const comtypeDetails = require('./models/comtype');
const comDetails = require('./models/complaints');
const studentDetails = require('./models/studentdetails');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/SGS';
const connect = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
var app = express();
mongoose.set('useCreateIndex', true);



// view engine setup
var cons = require('consolidate');

// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

//app.use(express.static(__dirname + '/public'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/user', userRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render error 
  res.status(err.status || 500);
  res.send('error');
});


module.exports = app;
