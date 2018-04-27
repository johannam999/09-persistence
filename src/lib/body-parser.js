'use strict';

const logger = require('./logger');

module.exports = function bodyParser(req) {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST' && req.method !== 'PUT') {
      return resolve(req);
    }

    let message = ''; // data listener we are waiting for data in chunks and add them together
    req.on('data', (data) => {
      logger.log(logger.INFO, `BODY PARSER: chunked request data: ${data.toString()}`);
      message += data.toString();
    });

    req.on('end', () => { // when data finishes = 'end' no data left, we attach body  to request object it will be equal to out msg, JSON will make a JS object from it
      try { // we need to attach body to message object and get a regular JS object (we) there is 
        // possibility that we get empty string or other undefined so we need to show error in this case
        req.body = JSON.parse(message);

        return resolve(req);
      } catch (err) {
        return reject(err);
      }
    });

    req.on('error', (err) => {
      logger.log(logger.ERROR, `BODY PARSER: Error occurred on parsing request body ${err}`);
      return reject(err);
    });
    return undefined;
  });
};
