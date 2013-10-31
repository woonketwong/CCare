var home = require('./controllers/index.js');
var user = require('./controllers/user.js');

module.exports = function(app){
  app.get('/', home.index);
  app.post('/worker-signup', home.workerSignup);
  app.get('/worker-signup', home.workerReadInfo);
  app.get('/collections/:collectionName', home.index);
};