import request from "supertest";
import { app } from "../../app";

it("return 200 on signin", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "layla@email.com",
      password: "12345678",
    })
    .expect(201);
  const res = await request(app)
    .post("/api/users/signin")
    .send({
      email: "layla@email.com",
      password: "12345678",
    })
    .expect(200);
  
  expect(res.get('Set-Cookie')).toBeDefined()
});
it("return 400 on signin invalid email", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "lay@email.com",
      password: "12345678",
    })
    .expect(400);

});

it("fails incorrect password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "layla@email.com",
      password: "12345678",
    })
    .expect(201);
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "layla@email.com",
      password: "12",
    })
    .expect(400);

});
