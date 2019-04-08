const app = require('./src/app');
const port = process.env.PORT || 3000;

if ( process.env !== 'Production' ) {
  const browserSync = require('browser-sync');
  const connectBrowserSync = require('connect-browser-sync');

  const browserSyncConfigurations = {"files": "src/resources/**"};
  app.use(connectBrowserSync(browserSync(browserSyncConfigurations)));

  const server = app.listen(port, function () {
    console.log("Node.js is listening to PORT:" + server.address().port);
  });
}
