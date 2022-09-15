const { app, mainPath } = require("../app");
const request = require("supertest");
const config = require("../config.js");
const { mapTypes, checkIfWrongPropertyTypes} = require("../utils/index");

/**
 * 
 * @param {"get" | "post" | "put" | "delete"} method 
 * @param {string} path 
 * @param {false | {id?: string, date?: number, query?: {}, note?: string}} objectToSend 
 * @returns {Response}
 */
const handleTestRes = (method, path, objectToSend = {}) =>
  objectToSend !== false
    ? request(app)
        [method](path)
        ["set"]("Accept", "application/json")
        ["send"](objectToSend)
    : request(app)[method](path)["set"]("Accept", "application/json");



describe("test /notes path", () => {
  test("GET all", async () => {
    const res = await handleTestRes(config.method.GET, mainPath, false);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res._body)).toBe(true);
  });

  test("GET(POST) one, test 0", async () => {
    const received = { query: { note: config.test[0].note } };
    const res = await request(app)
      .post(mainPath)
      .set("Accept", "application/json")
      .send(received);
    
    expect(res._body.result[0]).toEqual(config.test[0]);
  });

  test("GET(POST) one, test1 case insensitive", async () => {
    const received = { query: { note: config.test[1].note.toLocaleLowerCase() } };
    const res = await request(app)
      .post(mainPath)
      .set("Accept", "application/json")
      .send(received);
    
    expect(res._body.result[0]).toEqual(config.test[1]);
  })
  test("POST, PUT and DELETE one", async () => {
    const receivedPost = config.test[2];
    const post = await request(app)
      .post(`${mainPath}/new`)
      .set("Accept", "application/json")
      .send(receivedPost);
    
    expect(post._body.result.acknowledged).toBe(true);
    expect(post._body.body).toEqual(config.test[2]);
    
    const postedItem = {
      ...post._body.body,
      _id: post._body.result.insertedId,
      edits: [],
    };

    const receivedPut = { note: config.test[3].note, date: config.test[3].date, id: postedItem._id };

    const put = await request(app)
      .put(mainPath)
      .set("Accept", "application/json")
      .send(receivedPut);
    
    expect(put._body.body).toEqual(receivedPut);
    expect(put._body.result.acknowledged).toBe(true);
    expect(put._body.result.modifiedCount).toBe(1);
    expect(put._body.result.upsertedId).toBe(null);

    const receivedDelete = { id: postedItem._id };
    const del = await request(app)
      .delete(mainPath)
      .set("Accept", "application/json")
      .send(receivedDelete);
    
    expect(del._body.result.acknowledged).toBe(true);
    expect(del._body.result.deletedCount).toBe(1);
    expect(del._body.id).toBe(postedItem._id);
    
  })
  it.todo("Should handle some helper funtions");
  it.todo("Test some fail request POST, GET, PUT");
  it.todo("Describe mongo with JSDOCS");
  it.todo("Use in project: husky, webpack, eslint");
});

describe("test error request", () => {
  test("bad endpoint", async () => {
    const res = await request(app)
      .get("/bad")
      .set("Accept", "application/json");
    
    expect(res.statusCode).toBe(404);
    expect(res._body).toEqual({ message: config.message.badRequest });
  })

  test("delete with null id", async () => {
    const received = { id: null };
    const res = await request(app)
      .delete(mainPath)
      .set("Accept", "application/json")
      .send(received)
    
    expect(res.statusCode).toBe(400);
    expect(res._body.message).toEqual(config.message.badProperty("id", "string"));
  })

  test("delete without id", async () => {
    const res = await request(app)
      .delete(mainPath)
      .set("Accept", "application/json")
    
    expect(res.statusCode).toBe(400);
    expect(res._body.message).toEqual(config.message.badProperty("id", "string"));

  })

  test("delete with wrong type id", async () => {
    const received = { id: 2137 };
    const res = await request(app)
      .delete(mainPath)
      .set("Accept", "application/json")
      .send(received)

    expect(res.statusCode).toBe(400);
    expect(res._body.message).toEqual(
      config.message.badProperty("id", "string")
    );
  });

  test("update without props", async () => {
    const received = {};
    const res = await request(app)
      .put(mainPath)
      .set("Accept", "application/json")
      .send(received);
    const expected = mapTypes(["id", "note", "date"]);
    const isWrongRequest = checkIfWrongPropertyTypes(expected, received);

    expect(res._body.message).toBe(isWrongRequest);
    expect(res.statusCode).toEqual(400);
  });

  test("update with wrong props", async () => {
    const received = { id: 2563235, date: "222333445", note: true };
    const res = await request(app)
      .put(mainPath)
      .set("Accept", "application/json")
      .send(received);
    const expected = mapTypes(["id", "note", "date"]);
    const isWrongRequest = checkIfWrongPropertyTypes(expected, received);

    expect(res._body.message).toBe(isWrongRequest);
    expect(res.statusCode).toEqual(400);

  });

  test("add item without props", async () => {
    const received = {id: 9};
    // const res = await request(app)
    // ["put"](mainPath)
    // ["set"]("Accept", "application/json")
    // ["send"](received);
    const res = await handleTestRes(config.method.POST,`${mainPath}/new`, received)
    console.log(res);
  })
})