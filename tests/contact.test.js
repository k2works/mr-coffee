'use strict';

const supertest = require('supertest');
const test = require('unit.js');
const app = require('../src/app');

const request = supertest(app);

describe('Test contact controller', function () {
  it('問い合わせテーブルを作る', function (done) {
    request.post('/api/create').expect(200).end(function (err, result) {
      test.string(result.body.Message).contains('問い合わせテーブルを作成しました');
      test.value(result).hasHeader('content-type', 'application/json; charset=utf-8');
      done(err);
    });
  });
});