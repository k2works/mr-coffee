const express = require('express');
const router = express.Router();
const config = require('../appConfigDynamodb');
const v4 = require('uuid/v4');
const request = require('request');

router.get('/contact.html', function(req, res){
  res.render("contact.html", {message:''});
});

router.post('/contact', async function (req, res) {
  let data;
  let message;
  let baseUrl;
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
      form: {
        "name": req.body.name,
        "email": req.body.email,
        "questionnaire": req.body.questionnaire,
        "category": req.body.category,
        "message": req.body.message,
      }
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
  const dynamodb = config.createDynamoDd();
  let message = '';
  let data;

  const contact = {
    TableName: "Contacts",
    KeySchema: [
      {AttributeName: "id", KeyType: "HASH"},
      {AttributeName: "name", KeyType: "RANGE"}
    ],
    AttributeDefinitions: [
      {AttributeName: "id", AttributeType: "S"},
      {AttributeName: "name", AttributeType: "S"}
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    }
  };

  try {
    data = await dynamodb.createTable(contact).promise();
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

router.post('/api/save', async function(req, res) {
  const dynamodbClient = config.createDynamoDdClient();
  let message;

  const params = {
    TableName: "Contacts",
    Item: {
      "id": v4(),
      "name": req.body.name,
      "email": req.body.email,
      "questionnaire": req.body.questionnaire,
      "category": req.body.category,
      "message": req.body.message,
    }
  };

  try {
    const data = await dynamodbClient.put(params).promise();
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

module.exports = router;