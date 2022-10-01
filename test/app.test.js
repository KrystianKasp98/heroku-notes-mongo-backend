const {app, mainPath} = require("../src/app");
const request = require("supertest");
const config = require("../config.js");
const {
  mapTypes,
  mapReceived,
  checkIfWrongPropertyTypes,
} = require("../utils/index");

/**
 *
 * @param {"get" | "post" | "put" | "delete"} method
 * @param {string} path
 * @param {false | {id?: string, date?: number, query?: {note?: string, date?: number, id?: string }, note?: string}} objectToSend
 * @returns {Response}
 */
const handleTestRes = (method, path, objectToSend = {}) =>
  objectToSend !== false ?
    request(app)
      [method](path)
      ["set"]("Accept", "application/json")
      ["send"](objectToSend) :
    request(app)[method](path)["set"]("Accept", "application/json");

describe("Test /notes path", () => {
  it.todo("prepare login authentication, use hashing password");
  it.todo("add api routes, add values to config");
  it.todo("refactor app, create auth");
  test("GET all", async () => {
    const res = await handleTestRes(config.method.GET, mainPath, false);

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res._body)).toEqual(true);
  });

  test("GET(POST) one, test 0", async () => {
    const received = {query: {note: config.testsApi[0].note}};
    const res = await handleTestRes(config.method.POST, mainPath, received);

    expect(res._body.result[0]).toEqual(config.testsApi[0]);
  });

  test("GET(POST) one, test1 case insensitive", async () => {
    const received = {
      query: {note: config.testsApi[1].note.toLocaleLowerCase()},
    };
    const res = await handleTestRes(config.method.POST, mainPath, received);

    expect(res._body.result[0]).toEqual(config.testsApi[1]);
  });

  test("POST, PUT and DELETE one", async () => {
    const receivedPost = config.testsApi[2];
    const post = await handleTestRes(
      config.method.POST,
      `${mainPath}/new`,
      receivedPost
    );

    expect(post._body.result.acknowledged).toEqual(true);
    expect(post._body.body).toEqual(config.testsApi[2]);

    const postedItem = {
      ...post._body.body,
      _id: post._body.result.insertedId,
      edits: [],
    };
    const receivedPut = {
      note: config.testsApi[3].note,
      date: config.testsApi[3].date,
      id: postedItem._id,
    };
    const put = await handleTestRes(config.method.PUT, mainPath, receivedPut);

    expect(put._body.body).toEqual(receivedPut);
    expect(put._body.result.acknowledged).toEqual(true);
    expect(put._body.result.modifiedCount).toEqual(1);
    expect(put._body.result.upsertedId).toEqual(null);

    const receivedDelete = {id: postedItem._id};
    const del = await handleTestRes(
      config.method.DELETE,
      mainPath,
      receivedDelete
    );

    expect(del._body.result.acknowledged).toEqual(true);
    expect(del._body.result.deletedCount).toEqual(1);
    expect(del._body.id).toEqual(postedItem._id);
  });
});

describe("Test error request", () => {
  test("Bad endpoint", async () => {
    const res = await handleTestRes(config.method.GET, "/bad", false);

    expect(res.statusCode).toEqual(404);
    expect(res._body).toEqual({message: config.message.badRequest});
  });

  test("Delete with null id", async () => {
    const received = {id: null};
    const res = await handleTestRes(config.method.DELETE, mainPath, received);
    const expected = mapTypes(["id"]);
    const mappedReceived = mapReceived(received);
    const isWrongRequest = checkIfWrongPropertyTypes(expected, mappedReceived);

    expect(res.statusCode).toEqual(400);
    expect(res._body.message).toEqual(isWrongRequest);
  });

  test("Delete without id", async () => {
    const res = await handleTestRes(config.method.DELETE, mainPath, false);
    const expected = mapTypes(["id"]);
    const isWrongRequest = checkIfWrongPropertyTypes(expected, {});

    expect(res.statusCode).toEqual(400);
    expect(res._body.message).toEqual(isWrongRequest);
  });

  test("Delete with wrong type id", async () => {
    const received = {id: 2137};
    const res = await handleTestRes(config.method.DELETE, mainPath, received);
    const expected = mapTypes(["id"]);
    const mappedReceived = mapReceived(received);
    const isWrongRequest = checkIfWrongPropertyTypes(expected, mappedReceived);

    expect(res._body.message).toEqual(isWrongRequest);
    expect(res.statusCode).toEqual(400);
  });

  test("Update without props", async () => {
    const received = {};
    const res = await handleTestRes(config.method.PUT, mainPath, received);
    const expected = mapTypes(["id", "note", "date"]);
    const mappedReceived = mapReceived(received);
    const isWrongRequest = checkIfWrongPropertyTypes(expected, mappedReceived);

    expect(res._body.message).toEqual(isWrongRequest);
    expect(res.statusCode).toEqual(400);
  });

  test("Update with wrong props", async () => {
    const received = {id: 2563235, date: "222333445", note: true};
    const res = await handleTestRes(config.method.PUT, mainPath, received);
    const expected = mapTypes(["id", "note", "date"]);
    const mappedReceived = mapReceived(received);
    const isWrongRequest = checkIfWrongPropertyTypes(expected, mappedReceived);

    expect(res._body.message).toEqual(isWrongRequest);
    expect(res.statusCode).toEqual(400);
  });

  test("Add without props", async () => {
    const received = {};
    const res = await handleTestRes(
      config.method.POST,
      `${mainPath}/new`,
      received
    );
    const expected = mapTypes(["note", "date"]);
    const mappedReceived = mapReceived(received);
    const isWrongRequest = checkIfWrongPropertyTypes(expected, mappedReceived);

    expect(res._body.message).toEqual(isWrongRequest);
    expect(res.statusCode).toEqual(400);
  });

  test("Add with wrong props", async () => {
    const received = {note: true, date: "", id: {}};
    const res = await handleTestRes(
      config.method.POST,
      `${mainPath}/new`,
      received
    );
    const expected = mapTypes(["note", "date"]);
    const mappedReceived = mapReceived(received);
    const isWrongRequest = checkIfWrongPropertyTypes(expected, mappedReceived);

    expect(res._body.message).toEqual(isWrongRequest);
    expect(res.statusCode).toEqual(400);
  });
});
