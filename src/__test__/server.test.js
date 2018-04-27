'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

const testPort = 5000;
const mockResource = { name: 'test name', content: 'test content' };
let mockId = null;

beforeAll(() => server.start(testPort));
afterAll(() => server.stop());

describe('VALID request to the API', () => {
  describe('POST /api/v1/box', () => {
    it('should respond with status 201 and created a new box', () => {
      return superagent.post(`:${testPort}/api/v1/box`)
        .send(mockResource)
        .then((res) => {
          mockId = res.body.id;
          expect(res.body.name).toEqual(mockResource.name);
          expect(res.body.content).toEqual(mockResource.content);
          expect(res.status).toEqual(201);
        });
    });
  });

  describe('GET /api/v1/box', () => {
    it('should respond with the a previously created box', () => {
      return superagent.get(`:${testPort}/api/v1/box?id=${mockId}`)
        .then((res) => {
          expect(res.body.name).toEqual(mockResource.name);
          expect(res.body.content).toEqual(mockResource.content);
          expect(res.status).toEqual(200);
        });
    });
  });
  describe('DELETE /api/box', () => {
    it('should respond with status 204 delete the box data', () => {
      return superagent.delete(`:${testPort}/api/v1/box?id=${mockId}`)
        .then((res) => {
          expect(res.body).toEqual({});
        });
    });
  }); 
});

describe('INVALID request', () => {
  describe('GET /api/v1/box', () => {
    it('should err out with 404 status code when id not found', () => {
      return superagent.get(`:${testPort}/api/v1/box?id=kolory`)
        .query({})
        .catch((err) => {
          expect(err.status).toEqual(404);
          expect(err).toBeTruthy();
        });
    });
  });
  describe('GET /api/v1/box box', () => {
    it('should err out with 400 status code when no id provided', () => {
      return superagent.get(`:${testPort}/api/v1/box?id=`)
        .query({})
        .catch((err) => {
          expect(err.status).toEqual(400);
          expect(err).toBeTruthy();
        });
    });
  });
 
  describe('DELETE /api/v1/box', () => {
    it('should respond with status 404 delete the box data', () => {
      return superagent.delete(`:${testPort}/api/v1/box?id=3`)
        .catch((err) => {
          expect(err.status).toEqual(404);
        });
    });
  });
});
