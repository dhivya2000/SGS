var express = require('express');
var path = require('path');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' })
  res.sendFile('home.html', {
    root: path.join(__dirname, '../')
})
  //res.sendFile('home.html');
});

module.exports = router;
