const express = require('express');
const router = express.Router();
const config = require('../appConfigDynamodb');

router.get('/contact.html', function(req, res){
  res.render("contact.html");
});

router.post('/api/create', async function(req, res) {
  let message = '';
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

  const dynamodb = config.createDynamoDd();
  dynamodb.createTable(contact, function (err, data) {
    if (err) {
      console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
      message = "問い合わせテーブルを作成できませんでした"
    } else {
      console.log("Create table. Table description JSON:", JSON.stringify(data, null, 2));
      message = "問い合わせテーブルを作成しました"
    }
  });

  res.send({
    "Message": message
  });
});

module.exports = router;