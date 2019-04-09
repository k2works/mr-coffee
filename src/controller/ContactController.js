const express = require('express');
const router = express.Router();

router.get('/contact.html', function(req, res){
  res.render("contact.html");
});

module.exports = router;