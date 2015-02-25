# moz-tanx

[tanx](http://tanx.playcanvas.com/) game with mobile gamepad support


## Installation

Install the Node dependencies:

    npm install


## Development

All of the game client code is static (see [__`cvan/tanx-client`__](https://github.com/cvan/tanx-client)). The HTTP and WebSocket servers live in [__`cvan/tanx-1`__](https://github.com/cvan/tanx-1/tree/gamepad).

Although a real server like Nginx is likely a better candidate for static content, all content here is served from a simple Node server to simplify deployment (and development).

To serve the site from the simple server:

    npm run dev

### Advanced

To run the server on a different port, set the `MOZ_TANX_HOST` and `MOZ_TANX_PORT` environment variables.


## Deployment

In production, the server is run instantiated like so:

    NODE_ENVIRONMENT=production node app.js

Alias for local development:

    npm run prod

To run the server à la Heroku:

    foreman start web
