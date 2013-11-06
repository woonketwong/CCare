#!/usr/bin/env node

var express = require("express"),
    Passpack = require("passpack"),
    Passport = require("passport").Passport,
    BasicStrategy = require("passport-http").BasicStrategy;

var passpack = new Passpack();

passpack._getConfig = function _getConfig(req, cb) {
  return cb(null, req.host, {
    realm: req.host,
  });
};

passpack._createInstance = function _createInstance(options, cb) {
  var instance = new Passport();

  instance.use("basic", new BasicStrategy(options, function(name, password, done) {
    return done(null, {name: name});
  }));

  instance.serializeUser(function(user, cb) {
    user.realm = options.realm;

    cb(null, JSON.stringify(user));
  });

  instance.deserializeUser(function(id, cb) {
    cb(null, JSON.parse(id));
  });

  cb(null, instance);
};

var app = express();

app.use(express.logger());
app.use(express.cookieParser());
app.use(express.session({secret: "keyboard cat"}));
app.use(passpack.attach());
app.use(passpack.middleware("initialize"));
app.use(passpack.middleware("session"));
app.use(app.router);

app.get("/login", passpack.middleware("authenticate", "basic", {
  successRedirect: "/",
}));

app.get("/", function(req, res, next) {
  if (!req.user) {
    return res.redirect("/login");
  }

  return res.send("hello, " + JSON.stringify(req.user));
});

app.listen(3000, function() {
  console.log("listening");
});
