const express = require('express');
const router = express.Router();

router.get('/api', function(req, res) {
  res.send({
    "Output": "Hello World!"
  });
});

router.post('/api', function(req, res) {
  res.send({
    "Output": "Hello World!"
  });
});

module.exports = router;
