var home = require('./routes/index');

module.exports = function(app){
  app.get('/', home.index);
  app.post('/formInput', home.signup);
  app.get('/collections/:collectionName', home.index);
};