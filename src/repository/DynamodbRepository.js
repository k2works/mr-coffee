const config = require('../appConfigDynamodb');
const contact = require('../model/Contact');

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
  const AWS = config.configAws();
  const dynamodbClient = new AWS.DynamoDB.DocumentClient();
  const params = contact.create(info);
  console.log("Adding a new item...");
  return await dynamodbClient.put(params).promise();
};

exports.selectAll = async function(params) {
  const AWS = config.configAws();
  const dynamodbClient = new AWS.DynamoDB.DocumentClient();
  console.log("Scanning table.");
  let data;
  data = await dynamodbClient.scan(params).promise();
  // continue scanning if we have more movies, because
  // scan can retrieve a maximum of 1MB of data
  if (typeof data.LastEvaluatedKey != "undefined") {
    console.log("Scanning for more...");
    params.ExclusiveStartKey = data.LastEvaluatedKey;
    data = await dynamodbClient.scan(params).promise();
  }
  return data;
};