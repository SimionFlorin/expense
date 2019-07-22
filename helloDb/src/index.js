const http = require('http');
const express = require('express');
const config = require('./config');
const db = require('./db');

const app = express();

require('./init/initDb')();
require('./init/initExpress')(app);
require('./init/initRoutes')(app);

const server = http.createServer(app);

server.listen(config.PORT, '0.0.0.0', () => {
    console.log(`app is listening on ${config.PORT}`);
});

const closeDb = () => db.close();

process.on('SIGINT', closeDb);
process.on('exit', closeDb);
