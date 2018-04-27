'use strict';

const logger = require('../lib/logger');
const Box = require('../model/box');
const storage = require('../lib/storage');

module.exports = function routeBox(router) {
  router.post('/api/v1/box', (req, res) => {
    logger.log(logger.INFO, 'ROUTE-BOX: POST /api/v1/box');

    try {
      const newBox = new Box(req.body.name, req.body.content);
      storage.create('Box', newBox)
        .then((box) => {
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(box));
          res.end();
          return undefined;
        });
    } catch (err) {
      logger.log(logger.ERROR, `ROUTE-BOX: There was a bad request ${err}`);
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.write('Bad request');
      res.end();
      return undefined;
    }
    return undefined;
  });

  router.get('/api/v1/box', (req, res) => {
    if (req.url.query.id) {
      storage.fetchOne('Box', req.url.query.id)
        .then((item) => {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(item));
          res.end();
          return undefined;
        })
        .catch((err) => {
          logger.log(logger.ERROR, err, JSON.stringify(err));
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.write('Resource not found');
          res.end();
          return undefined;
        });
    } else {
      storage.fetchAll('Box')
        .then((item) => {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(JSON.stringify(item));
          res.end();
          return undefined;
        })
        .catch((err) => {
          logger.log(logger.ERROR, err, JSON.stringify(err));
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.write('Resource not found');
          res.end();
          return undefined;
        });
    }
  }); 


  router.delete('/api/v1/box', (req, res) => {
    if (!req.url.query.id) {
      
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(item));
      res.end();
      return undefined;
    }
    storage.delete('Box', req.url.query.id)
      .then((item) => {
        res.writeHead(204, { 'Content-Type': 'text/plain' });
        res.write('done deleting', JSON.stringify(item));
        res.end();
        return undefined;
      })
      .catch((err) => {
        logger.log(logger.ERROR, err, JSON.stringify(err));
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Resource not found');
        res.end();
        return undefined;
      });
    return undefined;
  });
};
