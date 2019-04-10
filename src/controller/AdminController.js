const express = require('express');
const router = express.Router();
const service = require('../service/ContactService');

router.get('/', (req, res) => {
  res.render("admin/index.html");
});

router.get('/index.html', (req, res) => {
  res.render("admin/index.html");
});

router.get('/login', (req, res) => {
  res.render("admin/login.html");
});

router.get('/contacts.html', async (req, res) => {
  let data = {Items: []};
  let message ='';
  try {
    data = await service.getAllContact();
  } catch (err) {
    console.error("Unable to get. Error JSON:", JSON.stringify(err, null, 2));
    message = '問い合わせ一覧を取得できませんでした';
  }
  res.render("admin/contacts.html", {message, data});
});

module.exports = router;
