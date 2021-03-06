var nodeStatic = require('node-static');
var tanxServer = require('tanx');


var internals = {
  node_env: process.env.NODE_ENVIRONMENT || 'development',
  host: process.env.MOZ_TANX_HOST || process.env.HOST || '0.0.0.0',
  port: process.env.MOZ_TANX_PORT || process.env.PORT || 4000
};


function Server(requestListener, opts) {
  if (typeof requestListener === 'object') {
    opts = requestListener;
  }
  if (!opts) {
    opts = {};
  }

  var tanxServerOpts = {
    host: opts.host || internals.host,
    port: opts.port || internals.port
  };

  var staticOpts = {
    cache: false
  };

  console.log('[%s] Server listening on http://%s:%s',
    internals.node_env, internals.host, internals.port);

  return tanxServer(function (req, res) {
    // Set CORS headers.
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }

    var fileServer = new nodeStatic.Server('./node_modules/tanx-client/',
                                           staticOpts);
    req.addListener('end', function (err) {
      if (err) {
        console.warn('[%s] [%s] %s', req.method, err.status, req.url);
      }

      fileServer.serve(req, res);
    }).resume();

    // Just a nicety for if this server is ever required as a module.
    if (typeof requestListener === 'function') {
      requestListener(req, res);
    }
  }, tanxServerOpts);
}


// If the server is called directly (i.e., not required as a module),
// immediately start the server.
if (require.main === module) {
    Server();
}


module.exports = Server;
