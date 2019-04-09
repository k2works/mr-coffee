const request = require('request');

if (process.env.NODE_ENV !== 'production') {
  baseUrl = 'http://localhost:5000';
} else {
  baseUrl = 'https://ebodx7rgs7.execute-api.ap-northeast-1.amazonaws.com/Prod';
}

const headers = {
  'Content-Type': 'application/json'
};

const options = {
  url: `${baseUrl}/api/save`,
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

