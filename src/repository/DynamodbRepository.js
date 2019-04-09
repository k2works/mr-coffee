const config = require('../appConfigDynamodb');
const docClient = config.createDynamoDdClient();
const contact = require('../model/contact');

exports.create = async function() {
  const AWS = config.configAws();
  const dynamodb = new AWS.DynamoDB();
  console.log("Creating a table...");
  return await dynamodb.createTable(contact.model).promise();
};

exports.drop = async function() {
  const AWS = config.configAws();
  const dynamodb = new AWS.DynamoDB();
  console.log("Dropping a table...");
  return await dynamodb.deleteTable({TableName: contact.model.TableName}).promise();
};

exports.save = async function(info) {
  const params = contact.create(info);
  console.log("Adding a new item...");
  return await docClient.put(params).promise();
};
