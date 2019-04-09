const apiUtil = require('../utils/ApiUtil');
const repository = require('../repository/DynamodbRepository');

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