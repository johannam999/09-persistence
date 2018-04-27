'use strict';

const http = require('http');

const Router = require('./router');

const router = new Router();
require('../route/route-box')(router);
// const logger = require('./logger');

const app = http.createServer(router.route());

// Server controls
const server = module.exports = {};
server.start = (port, callback) => app.listen(port, callback);
server.stop = callback => app.close(callback);
