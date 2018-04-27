'use strict';

const uuid = require('uuid/v4');
const logger = require('../lib/logger');

module.exports = class {
  constructor(name, content) {
    if (!name || !content) throw new Error('POST request requires name and content');
    this.name = name;
    this.content = content;
    this.id = uuid();
    logger.log(logger.INFO, `NOTE: Created a new box: ${JSON.stringify(this)}`);
  }
};

