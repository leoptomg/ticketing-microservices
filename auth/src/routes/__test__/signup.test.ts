import request from "supertest";
import { app } from "../../app";

it("return 201 on signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "layla@email.com",
      password: "12345678",
    })
    .expect(201);
});

it("return 400 on invalid body", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "layla@email.com",
      password: "5678",
    })
    .expect(400);
});

it("return 400 on empty body", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "layla@email.com",
    })
    .expect(400);
  await request(app)
    .post("/api/users/signup")
    .send({
      password: "layla@email.com",
    })
    .expect(400);
});
it("duplicate email", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "layla@email.com",
      password: "12345678"
    })
    .expect(201);
  await request(app)
    .post("/api/users/signup")
    .send({
        email: "layla@email.com",
        password: "12345678"  
    })
    .expect(400);
});

it("return JWT", async () => {
    const res = await request(app)
      .post("/api/users/signup")
      .send({
        email: "layla@email.com",
        password: "12345678",
      })
      .expect(201);
    
    expect(res.get('Set-Cookie')).toBeDefined()
  });
  