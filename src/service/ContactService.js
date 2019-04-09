const apiUtil = require('../utils/ApiUtil');
const repository = require('../repository/DynamodbRepository');
const contact = require('../model/Contact');

exports.registContact = async(info) => {
  return await apiUtil.apiCall(info)
};

exports.createTable = async () => {
  await repository.create();
};

exports.dropTable = async () => {
  await repository.drop();
};

exports.saveContactInfo = async (info) => {
  return await repository.save(info)
};

exports.getAllContact = async () => {
  return await repository.selectAll({TableName: contact.model.TableName})
};