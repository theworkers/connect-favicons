var fs = require('fs');
var crypto = require('crypto');

module.exports = function favicons(dir, opts) {
  dir = dir || process.cwd() + '/public';
  opts = opts || {};

  var cache = Object.create(null);
  var maxAge = opts.maxAge || 86400000;
  var filenames = [
      'favicon.ico'
    , 'apple-touch-icon.png'
    , 'apple-touch-icon-precomposed.png'
    , 'apple-touch-icon-57x57.png'
    , 'apple-touch-icon-57x57-precomposed.png'
    , 'apple-touch-icon-72x72.png'
    , 'apple-touch-icon-72x72-precomposed.png'
    , 'apple-touch-icon-114x114.png'
    , 'apple-touch-icon-114x114-precomposed.png'
    , 'apple-touch-icon-144x144.png'
    , 'apple-touch-icon-144x144-precomposed.png'
  ];

  return function favicons(req, res, next) {
    var filename = req.path.split('/').pop();
    var filetype = filename.split('.').pop();

    (function tryFiles(i) {
      i = i || 0;
      
      if (filenames.length === i) return next();
      
      if (filename === filenames[i]) {

        if (cache[filename]) {
          res.writeHead(200, cache[filename].headers);
          res.end(cache[filename].body);
          return;
        }

        fs.readFile(dir + req.path, function(err, buf){
          if (err) return next();
          cache[filename] = {
              headers: {
                  'Content-Type': filetype === 'ico' ? 'image/x-icon' : 'image/'+filetype
                , 'Content-Length': buf.length
                , 'ETag': '"' + crypto.createHash('md5').update(buf).digest("hex") + '"'
                , 'Cache-Control': 'public, max-age=' + (maxAge / 1000)
              }
            , body: buf
          };
          res.writeHead(200, cache[filename].headers);
          res.end(cache[filename].body);
        });

        return;
      }

      tryFiles(++i);
    
    }());
  };
};
