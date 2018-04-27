'use strict';

const response = module.exports = {};

// we are making sure the api works
response.sendJSON = (res, status, data) => {
  res.writeHead(status, { 'Content-type': 'application/json' }); // takes only regular 
  // string to we need to stringify first
  res.write(JSON.stringify(data));
  // so if 'type err must.. be a buffer' it might mean we have an object 
  // or sth messing bc we need to stringify
  res.end();
  return undefined;
};
response.sendText = (res, status, msg) => {
  res.writeHead(status, { 'Content-type': 'text/plain' });
  res.write(msg);
  res.end();
  return undefined;
};

