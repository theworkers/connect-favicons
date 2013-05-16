Connect Favicons
================
Serve site icons (favicon.ico and apple-touch-icon.png and its flavours) quickly and from any directory.


Usage
=====
Add connect-favicons to your middleware stack before everything else. The whole point here is to serve favicon.ico and apple-touch-icon.png (et al.) quickly, without involving any routing.

In this case, you may have all your site icons, including `favicon.ico` in `/public/img/icons`:

```js
app.use(favicons(__dirname + '/public/img/icons'));
```

Now any request to the `example.com/favicon.ico` or `example.com/apple-touch-icon.png` will be served by Connect Favicons, reading from the folder you specified.

Example
=======

```js
var http     = require('http');
var path     = require('path');
var express  = require('express');
var favicons = require('connect-favicons');

var app = module.exports = express();

// Middleware stack
app.use(favicons(__dirname + '/public/img/icons'));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.directory(path.join(__dirname, '/public'), { icons:true }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

// Start server
http.createServer(app).listen(3000, function(){
    console.log("Express server listening on port " + 3000);
});
```

Valid icon filenames
====================

* `favicon.ico`
* `apple-touch-icon.png`
* `apple-touch-icon-precomposed.png`
* `apple-touch-icon-57x57.png`
* `apple-touch-icon-57x57-precomposed.png`
* `apple-touch-icon-72x72.png`
* `apple-touch-icon-72x72-precomposed.png`
* `apple-touch-icon-114x114.png`
* `apple-touch-icon-114x114-precomposed.png`
* `apple-touch-icon-144x144.png`
* `apple-touch-icon-144x144-precomposed.png`

