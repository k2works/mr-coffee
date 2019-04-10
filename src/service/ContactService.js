const apiUtil = require('../utils/ApiUtil');
const repository = require('../repository/DynamodbRepository');
const contact = require('../model/Contact');
const faker = require('faker');
faker.locale = 'ja';

exports.registContact = async(info) => {
  return await apiUtil.apiCall(info)
};

exports.createTable = async () => {
  await repository.create();
};

exports.dropTable = async () => {
  await repository.drop();
};

exports.seedData = async () => {
  const list = [...Array(10).keys()].map((i) => {
    return {
      name: `${faker.name.lastName()} ${faker.name.firstName()} `,
      email: faker.internet.email(),
      questionnaire: "answer1",
      category: 'category2',
      message: `問い合わせ ${i}`
    }
  });
  console.log(list);
  await Promise.all(list.map(repository.save));
};

exports.saveContactInfo = async (info) => {
  return await repository.save(info)
};

exports.getAllContact = async () => {
  return await repository.selectAll({TableName: contact.model.TableName})
};