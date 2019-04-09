const express = require('express');
const router = express.Router();

router.get('/contact.html', function(req, res){
  res.render("contact.html");
});

router.post('/api/create', async function(req, res) {
  res.send({
    "Message": "問い合わせテーブルを作成しました"
  });
});

module.exports = router;