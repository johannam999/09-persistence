'use strict';

const logger = require('./logger');

const storage = module.exports = {};
const Promise = require('bluebird'); // useful for testing extra features before promise was built into JS
const fs = Promise.promisifyAll(require('fs'), { suffix: 'Prom' }); 
// determine suffix optional argument to determine
// we want to inform this is a promise, build in is 'async' if we dont use anything

// taking schema and item= title and content, error check if no data error, then turning 
// into json and write the path if successful
storage.create = function create(schema, item) {
  if (!schema) return Promise.reject(new Error('Cannot create a new item, schema required'));
  if (!item) return Promise.reject(new Error('Cannot create a new item, item required'));
  const json = JSON.stringify(item);
  
  
  return fs.writeFileProm(`${__dirname}/../data/${schema}/${item.id}.json`, json)
    .then(() => {
      logger.log(logger.INFO, 'STORAGE: Created a new resource');
      return item; 
    })  
    .catch(err => Promise.reject(err));  
};

// get request
storage.fetchOne = function fetchOne(schema, id) {
  if (!schema) return Promise.reject(new Error('expected schema name'));
  if (!id) return Promise.reject(new Error('expected id'));

  return fs.readFileProm(`${__dirname}/../data/${schema}/${id}.json`)
    .then((data) => {
      try {
        const item = JSON.parse(data.toString());
        return item;
      } catch (err) {
        return Promise.reject(err); // the catch is attached to the try
      }
    })
    .catch((err) => {
      logger.log(logger.ERROR, JSON.stringify(err));
    });
};

// if id doesn't exist in box we run fetchAll
storage.fetchAll = function fetchAll(schema) { // schema is a string called Box
  if (!schema) return Promise.reject(new Error('expected schema name'));
    
    
  return fs.readdirProm(`${__dirname}/../data/${schema}.json`)
    .then((data) => {
      try { // create data turn into string to display
        const item = JSON.parse(data.toString());
        return item;
      } catch (err) {
        return Promise.reject(err); 
      }
    })
    .catch((err) => {
      logger.log(logger.ERROR, JSON.stringify(err));
    });
};

storage.update = function update() {

};

storage.delete = function del(schema, id) {
  if (!schema) return Promise.reject(new Error('expected schema name'));
  if (!id) return Promise.reject(new Error('expected id'));
    
  return fs.unlinkProm(`${__dirname}/../data/${schema}/${id}.json`)
    .then(() => {
      try {
        const some = { content: '' };
        return some;
      } catch (err) {
        return Promise.reject(err); 
      }
    })
    .catch((err) => {
      logger.log(logger.ERROR, JSON.stringify(err));
    });
};

