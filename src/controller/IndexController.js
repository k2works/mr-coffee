const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
  res.render("index.html");
});

router.get('/index.html', function(req, res){
  res.render("index.html");
});

module.exports = router;