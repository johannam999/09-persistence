'use strict';

const logger = require('../lib/logger');
const Box = require('../model/box');
const storage = require('../lib/storage');
const response = require('../lib/response');

module.exports = function routeBox(router) {
  router.post('/api/v1/box', (req, res) => {
    logger.log(logger.INFO, 'ROUTE-BOX: POST /api/v1/box');

    try {
      const newBox = new Box(req.body.name, req.body.content);
      storage.create('Box', newBox)
        .then((box) => {
          response.sendJSON(res, 201, box);
          
          return undefined;
        });
    } catch (err) {
      logger.log(logger.ERROR, `ROUTE-BOX: There was a bad request ${err}`);
      response.sendText(res, 400, err.message);

      
      return undefined;
    }
    return undefined;
  });

  router.get('/api/v1/box', (req, res) => {
    if (req.url.query.id) {
      storage.fetchOne('Box', req.url.query.id)
        .then((item) => {
          response.sendJSON(res, 200, item);
          
          return undefined;
        })
        .catch((err) => {
          logger.log(logger.ERROR, err, JSON.stringify(err));
          response.sendText(res, 404, 'Resource not found');

          return undefined;
        });
    } else {
      storage.fetchAll('Box')
        .then((item) => {
          response.sendJSON(res, 200, item);
          return undefined;
        })
        .catch((err) => {
          logger.log(logger.ERROR, err, JSON.stringify(err));
          response.sendText(res, 400, 'Resource not found');
          return undefined;
        });
    }
  }); 


  router.delete('/api/v1/box', (req, res) => {
    if (req.url.query.id) {
      storage.delete('Box', req.url.query.id)
        .then((item) => {
          response.sendJSON(res, 204, item);
          return undefined;
        })
        .catch((err) => {
          logger.log(logger.ERROR, err, JSON.stringify(err));
          response.sendText(res, 404, 'Resource not found');
          return undefined;
        });
      return undefined;
    }
    return undefined;
  });
};
