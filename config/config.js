// all environments
// var path = require('path');
// var express = require('express');

// module.exports = function(app){
//   app.set('port', process.env.PORT || 3000);
//   app.set('views', path.join(__dirname, '../views'));
//   app.set('view engine', 'jade');
//   app.use(express.favicon());
//   app.use(express.logger('dev'));
//   app.use(express.bodyParser());
//   app.use(express.methodOverride());
//   app.use(app.router);
//   app.use(express.static(path.join(__dirname, '../public')));

//   // development only
//   if ('development' == app.get('env')) {
//     app.use(express.errorHandler());
//   }

// };