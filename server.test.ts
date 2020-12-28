import supertest from "supertest";
import { Pool } from "pg";
import { makeApp } from "./app";

const testConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.USE_SSL ? {
    rejectUnauthorized: false //when connecting from laptop to heroku postgres.  
  } : false,
};
// A note on the ssl property:
//   In prod, ssl should be true.
//   When connecting a local server to local db, false
//   When connecting a local server to heroku db, value should be: { rejectUnauthorized: false }

let pool: Pool;
let app: Express.Application;

beforeAll(async (done) => {
  pool = new Pool(testConfig);
  await pool.connect();
  app = makeApp(pool);
  done();
});


// describe("POST /posts", () => {
//   it("Responds with the created post", async () => {
//     const res = await supertest(app).post("/posts").send({
//       title: "Amazing blog for testing.",
//       prose: "This is a really cool post.",
//     });
//     expect(res.status).toBe(201);
//     expect(res.body).toHaveProperty("id");
//     expect(res.body.title).toMatch(/Amazing blog/);
//     expect(res.body.prose).toMatch(/really cool post/);
//     expect(res.body).toHaveProperty("date");
//   });
// });

describe("GET /", () => {
  it("responds with 200 and hello world!", async () => {
    expect(4).toBe(4);
    const res = await supertest(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body).toBe("Hello world!");
  });
});
