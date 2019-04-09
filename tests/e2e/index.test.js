module.exports = {
  before: function (browser, done) {
    server = require("./server")(done); // done is a callback that executes when the server is started
    config = require("./config");
    url = config.url("index.html");
  },

  after: function () {
    server.close();
  },

  "トップページテスト" : function (browser) {
    browser
      .url(url)
      .waitForElementVisible("body")
      .assert.containsText(".navbar-brand", "Mr.M COFFEE")
      .end();
  }
};