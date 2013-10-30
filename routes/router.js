var home = require('./routes/index');

module.exports = function(app){
  app.get('/', home.index);
  app.post('/worker-signup', home.workerSignup);
  app.get('/collections/:collectionName', home.index);
};