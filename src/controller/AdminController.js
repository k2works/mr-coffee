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

router.get('/buttons.html', (req, res) => {
  res.render("admin/buttons.html");
});

router.get('/cards.html', (req, res) => {
  res.render("admin/cards.html");
});

router.get('/utilities-color.html', (req, res) => {
  res.render("admin/utilities-color.html");
});

router.get('/utilities-border.html', (req, res) => {
  res.render("admin/utilities-border.html");
});

router.get('/utilities-animation.html', (req, res) => {
  res.render("admin/utilities-animation.html");
});

router.get('/utilities-other.html', (req, res) => {
  res.render("admin/utilities-other.html");
});

router.get('/login.html', (req, res) => {
  res.render("admin/login.html");
});

router.get('/register.html', (req, res) => {
  res.render("admin/register.html");
});

router.get('/forgot-password.html', (req, res) => {
  res.render("admin/forgot-password.html");
});

router.get('/404.html', (req, res) => {
  res.render("admin/404.html");
});

router.get('/blank.html', (req, res) => {
  res.render("admin/blank.html");
});

router.get('/charts.html', (req, res) => {
  res.render("admin/charts.html");
});

router.get('/tables.html', (req, res) => {
  res.render("admin/tables.html");
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
