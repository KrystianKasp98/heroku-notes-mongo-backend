const { app, mainPath } = require("../app");
const request = require("supertest");
const config = require("../config.js");

describe("test /notes path", () => {
  test("GET all", async () => {
    const res = await request(app).get(mainPath).set("Accept", "application/json");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res._body)).toBe(true);
  });

  test("GET(POST) one, test 0", async () => {
    const res = await request(app)
      .post(mainPath)
      .set("Accept", "application/json")
      .send({ query:{ note: config.test[0].note } });
    
    expect(res._body.result[0]).toEqual(config.test[0]);
  });

  test("GET(POST) one, test1 case insensitive", async () => {
    const res = await request(app)
      .post(mainPath)
      .set("Accept", "application/json")
      .send({ query: { note: config.test[1].note.toLocaleLowerCase() } });
    
    expect(res._body.result[0]).toEqual(config.test[1]);
  })
  test("POST, PUT and DELETE one", async () => {
    const post = await request(app)
      .post(`${mainPath}/new`)
      .set("Accept", "application/json")
      .send(config.test[2]);
    
    expect(post._body.result.acknowledged).toBe(true);
    expect(post._body.body).toEqual(config.test[2]);
    
    const postedItem = {
      ...post._body.body,
      _id: post._body.result.insertedId,
      edits: [],
    };

    const itemToPut = { note: config.test[3].note, date: config.test[3].date, id: postedItem._id };

    const put = await request(app)
      .put(mainPath)
      .set("Accept", "application/json")
      .send(itemToPut);
    
    expect(put._body.body).toEqual(itemToPut);
    expect(put._body.result.acknowledged).toBe(true);
    expect(put._body.result.modifiedCount).toBe(1);
    expect(put._body.result.upsertedId).toBe(null);

    const del = await request(app)
      .delete(mainPath)
      .set("Accept", "application/json")
      .send({ id: postedItem._id });
    
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
    const res = await request(app)
      .delete(mainPath)
      .set("Accept", "application/json")
      .send({ id: null })
    
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
    const res = await request(app)
      .delete(mainPath)
      .set("Accept", "application/json")
      .send({id: 2137})

    expect(res.statusCode).toBe(400);
    expect(res._body.message).toEqual(
      config.message.badProperty("id", "string")
    );
  });
})