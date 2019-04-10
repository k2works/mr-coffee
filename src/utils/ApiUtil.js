const config = require('../appConfig');
const request = require('request');

const headers = {
  'Content-Type': 'application/json'
};

const options = {
  url: `${config.basUrl()}/api/save`,
  method: 'POST',
  headers: headers,
  json: true,
  form: {}
};

const apiCall = function (info) {
  options.form = info;
  return new Promise((resolve, reject) => {
    request(options, (err, res, body) => {
      if (err) reject(err);
      resolve(body)
    });
  });
};

module.exports = {apiCall};

