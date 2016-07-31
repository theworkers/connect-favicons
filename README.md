Connect Favicons
================
Serve site icons (favicon.ico and apple-touch-icon.png and all its flavours) quickly and from any directory.


Install
-------
```shell
npm install --save git://github.com/theworkers/connect-favicons.git
```


Recognised icon filenames
--------------------

* `favicon.ico`
* `favicon.png`
* `apple-touch-icon.png`
* `apple-touch-icon-precomposed.png`
* `apple-touch-icon-57x57.png`
* `apple-touch-icon-57x57-precomposed.png`
* `apple-touch-icon-72x72.png`
* `apple-touch-icon-72x72-precomposed.png`
* `apple-touch-icon-76x76.png`
* `apple-touch-icon-76x76-precomposed.png`
* `apple-touch-icon-114x114.png`
* `apple-touch-icon-114x114-precomposed.png`
* `apple-touch-icon-120x120.png`
* `apple-touch-icon-120x120-precomposed.png`
* `apple-touch-icon-144x144.png`
* `apple-touch-icon-144x144-precomposed.png`
* `apple-touch-icon-152x152.png`
* `apple-touch-icon-152x152-precomposed.png`
* `apple-touch-icon-180x180.png`
* `apple-touch-icon-180x180-precomposed.png`
* `favicon-16x16.png`
* `favicon-32x32.png`
* `favicon-128x128.png`
* `mstile-150x150.png`
* `safari-pinned-tab.svg`


Usage
-----
Add connect-favicons to your middleware stack before everything else. The whole point here is to serve favicon.ico and apple-touch-icon.png (et al.) quickly, without involving any routing.

In this case, you may have all your site icons, including `favicon.ico` in `/public/img/icons`:

```js
app.use(favicons(__dirname + '/public/img/icons'));
```

Now any request to the `example.com/favicon.ico` or `example.com/apple-touch-icon.png` will be served by Connect Favicons, reading from the folder you specified.


Example
-------

```js
var http     = require('http');
var path     = require('path');
var express  = require('express');
var favicons = require('connect-favicons');

var app = express();

// Middleware stack
app.use(favicons(__dirname + '/public/img/icons'));
app.use(express.static(path.join(__dirname, '/public')));

http.createServer(app).listen(3000, function(){
    console.log("Express server listening on port " + 3000);
});
```
