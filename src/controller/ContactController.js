const express = require('express');
const router = express.Router();
const config = require('../appConfigDynamodb');
const v4 = require('uuid/v4');

router.get('/contact.html', function(req, res){
  res.render("contact.html");
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
  }

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