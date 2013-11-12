Passports
========

Multi-tenancy (read: virtual hosts) for Passport.JS

Overview
--------

Passports makes things easier if you're running a multi-tenanted application with
[Passport.JS](http://passportjs.org/) by abstracting away some of the book
keeping involved with instantiating multiple passport instances and choosing
which to use for a given request.

Installation
------------

Available via [npm](http://npmjs.org/):

> $ npm install passports

Or via git:

> $ npm install git://github.com/deoxxa/passports.git

Usage
-----

Passports provides a framework for applications to define their own passport.js
multi-tenanting implementations. It requires you to provide two functions:
`_getConfig` and `_createInstance`. These functions are called when necessary to
do exactly what they sound like they do, allowing you to completely control the
configuration and instantiation of the passport objects managed by passports.

You can see an example of how this all fits together below, in the "example"
section.

**_getConfig**

The `_getConfig` function is used to work out what the configuration parameters
are for passport for a given request. It's provided with the request object from
express, and is expected to call the callback function when it's done with an
error (or null), an ID, and optionally some configuration parameters for
`_createInstance` to use in instantiating the passport object.

```javascript
passports._getConfig = function _getConfig(req, cb) {
  cb(null, req.host, {
    realm: "Please log in to " + req.host,
  });
};
```

**_createInstance**

The `createInstance` function is used to actually instantiate a passport object.
It's only called when a cached object isn't already available, providing a means
of lazy instantiation. It's given some configuration parameters (from
`_getConfig`) and is expected to call the callback function with an error (or
null) and the resultant passport instance.

```javascript
passports._createInstance = function _createInstance(options, cb) {
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
```

API
---

**constructor**

Constructs a new Passports object, optionally providing the `_getConfig` and
`_createInstance` functions in an object.

```javascript
new Passports([options]);
```

```javascript
// basic instantiation
var passports = new Passports();

// instantiation with functions
var passports = new Passports({
  getConfig: myGetConfig,
  createInstance: myCreateInstance,
});
```

Arguments

* _options_ - an object specifying values for `_getConfig` and `_createInstance`

**attach**

Returns an express/connect-compatible middleware function that attaches the
correct passport object to a request. You probably want this as the first
passports-related piece of middleware in your application.

```javascript
passports.attach();
```

```javascript
app.use(passports.attach());
```

**middleware**

Wraps a passport middleware function so that it'll be called using the correct
passport instance, optionally passing some arguments to it.

```javascript
passports.middleware(name, [arg1, [arg2, ...]]);
```

```javascript
app.use(passports.middleware("authenticate", "basic"));
```

Arguments

* _name_ - name of the passport middleware function.
* _argN_ - arguments to be passed to the middleware.

**#added**

`added` is an event that's fired with the id of a passport object after it's
created and added to the passports collection.

```javascript
passports.on("added", onAdded);
```

```javascript
passports.on("added", function onAdded(id, instance) {
  console.log(id);
});
```

Parameters

* _id_ - id of the passport instance.
* _instance_ - the passport instance itself.

Example
-------

Also see [example.js](https://github.com/deoxxa/passports/blob/master/example.js).

```javascript
// $ npm install express passports passport passport-http

var express = require("express"),
    Passports = require("passports"),
    Passport = require("passport").Passport,
    BasicStrategy = require("passport-http").BasicStrategy;

var passports = new Passports();

passports._getConfig = function _getConfig(req, cb) {
  return cb(null, req.host, {
    realm: req.host,
  });
};

passports._createInstance = function _createInstance(options, cb) {
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
app.use(passports.attach());
app.use(passports.middleware("initialize"));
app.use(passports.middleware("session"));
app.use(app.router);

app.get("/login", passports.middleware("authenticate", "basic", {
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
```

License
-------

3-clause BSD. A copy is included with the source.

Contact
-------

* GitHub ([deoxxa](http://github.com/deoxxa))
* Twitter ([@deoxxa](http://twitter.com/deoxxa))
* ADN ([@deoxxa](https://alpha.app.net/deoxxa))
* Email ([deoxxa@fknsrs.biz](mailto:deoxxa@fknsrs.biz))
