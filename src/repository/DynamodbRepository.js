const config = require('../appConfigDynamodb');
const contact = require('../model/contact');
const AWS = config.configAws();
const dynamodb = new AWS.DynamoDB();
const dynamodbClient = new AWS.DynamoDB.DocumentClient();

exports.create = async function() {
  console.log("Creating a table...");
  return await dynamodb.createTable(contact.model).promise();
};

exports.drop = async function() {
  console.log("Dropping a table...");
  return await dynamodb.deleteTable({TableName: contact.model.TableName}).promise();
};

exports.save = async function(info) {
  console.log("Adding a new item...");
  const params = contact.create(info);
  return await dynamodbClient.put(params).promise();
};
