const express = require('express');
const router = express.Router();
const request = require('request');
const repository = require('../repository/DynamodbRepository');

router.get('/contact.html', function(req, res){
  res.render("contact.html", {message:''});
});

router.post('/contact', async function (req, res) {
  let data;
  let message;
  let baseUrl;
  const info = contactParams(req);

  try {
    if (process.env.NODE_ENV !== 'production') {
      baseUrl = 'http://localhost:5000';
    } else {
      baseUrl = 'https://ebodx7rgs7.execute-api.ap-northeast-1.amazonaws.com/Prod';
    }

    const headers = {
      'Content-Type': 'application/json'
    };

    const options = {
      url: `${baseUrl}/api/save`,
      method: 'POST',
      headers: headers,
      json: true,
      form: info
    };

    const apiCall = function (options) {
      return new Promise((resolve, reject) => {
        request(options, (err, res, body) => {
          if (err) reject(err);
          resolve(body)
        });
      });
    };

    data = await apiCall(options);
    console.log("Save table. Table description JSON:", JSON.stringify(data, null, 2));
    message = data.Message;
  } catch (err) {
    console.error("Unable to save table. Error JSON:", JSON.stringify(err, null, 2));
    message = err.Message;
  }
  res.render("contact.html", {message});
});

router.post('/api/create', async function(req, res) {
  let message;

  try {
    const data = await repository.create();
    console.log("Create table. Table description JSON:", JSON.stringify(data, null, 2));
    message = "問い合わせテーブルを作成しました"
  } catch (err) {
    console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    message = "問い合わせテーブルを作成できませんでした"
  }

  res.send({
    "Message": message
  });
});

router.post('/api/drop', async function(req, res) {
  let message;

  try {
    const data = await repository.drop();
    console.log("Drop table. Table description JSON:", JSON.stringify(data, null, 2));
    message = "問い合わせテーブルを削除しました"
  } catch (err) {
    console.error("Unable to drop table. Error JSON:", JSON.stringify(err, null, 2));
    message = "問い合わせテーブルを削除できませんでした"
  }

  res.send({
    "Message": message
  });
});

router.post('/api/save', async function(req, res) {
  let message;

  try {
    const info = contactParams(req);
    const data = await repository.save(info);
    console.log("Save table. Table description JSON:", JSON.stringify(data, null, 2));
    message = "問い合わせを送信しました"
  } catch (err) {
    console.error("Unable to save table. Error JSON:", JSON.stringify(err, null, 2));
    message = "問い合わせを送信できませんでした"
  }

 res.send({
   "Message": message
 })
});

const contactParams = (req) => {
  return {
    name: req.body.name,
    email: req.body.email,
    questionnaire: req.body.questionnaire,
    category: req.body.category,
    message: req.body.message,
  };
};

module.exports = router;