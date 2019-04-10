const command = process.argv[2];
const service = require('../src/service/ContactService');
const faker = require('faker');
faker.locale = 'ja';

const seed = () => {
  const info = {
    name: "テスト太郎",
    email: "test@test.com",
    questionnaire: "answer1",
    category: 'category2',
    message: '問い合わせ'
  };
  [...Array(100).keys()].forEach((i) => {
    info.name = `${faker.name.lastName()} ${faker.name.firstName()} `;
    info.email = faker.internet.email();
    info.message = `問い合わせ ${i}`;
    console.log(info);
    service.saveContactInfo(info);
  });
};

switch (command) {
  case 'create':
    service.createTable();
    break;
  case 'drop':
    service.dropTable();
    break;
  case 'seed':
    seed();
    break;
  default:
    console.log('無効なパラメータです')
}

