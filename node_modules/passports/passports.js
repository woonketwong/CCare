var events = require("events");

var Passpack = module.exports = function Passpack(options) {
  events.EventEmitter.call(this);

  this._instances = {};
  this._counter = 0;

  if (options && options.createInstance) {
    this._createInstance = options.createInstance;
  }

  if (options && options.getConfig) {
    this._getConfig = options.getConfig;
  }
};
Passpack.prototype = Object.create(events.EventEmitter.prototype, {constructor: {value: Passpack}});

Passpack.prototype.getInstance = function getInstance(id, options, cb) {
  if (this._instances[id]) {
    return cb(null, this._instances[id]);
  } else if (this._instances[id] === null) {
    return this.once("added", this.getInstance.bind(this, id, options, cb));
  }

  this._instances[id] = null;

  this._createInstance(options, function doneCreateInstance(err, instance) {
    if (err) {
      delete this._instances[id];

      return cb(err);
    }

    this._instances[id] = instance;

    cb(null, instance);
    this.emit("added", id, instance);
  }.bind(this));
};

Passpack.prototype.getFromRequest = function getFromRequest(req, cb) {
  this._getConfig(req, function onChoice(err, id, options) {
    if (err) {
      return cb(err);
    }

    return this.getInstance(id, options, cb);
  }.bind(this));
};

Passpack.prototype.attach = function attach() {
  var getFromRequest = this.getFromRequest.bind(this);

  return function attach(req, res, next) {
    getFromRequest(req, function(err, instance) {
      if (err) {
        return next(err);
      }

      req.passport = instance;

      return next();
    });
  };
};

Passpack.prototype.middleware = function middleware(name) {
  var fn = ["_passpack_cached", name, this._counter++].join("_"),
      args = [].slice.call(arguments, 1);

  return function cached(req, res, next) {
    if (!req.passport[fn]) {
      req.passport[fn] = req.passport[name].apply(req.passport, args);
    }

    return req.passport[fn](req, res, next);
  };
};
