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
  it.todo("Should handle POST item and DELETE item");
  it.todo("Should handle PUT item");
  it.todo("Should handle some helper funtions");
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
})