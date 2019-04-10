const command = process.argv[2];
const service = require('../src/service/ContactService');

switch (command) {
  case 'create':
    service.createTable();
    break;
  case 'drop':
    service.dropTable();
    break;
  case 'seed':
    service.seedData();
    break;
  default:
    console.log('無効なパラメータです')
}

