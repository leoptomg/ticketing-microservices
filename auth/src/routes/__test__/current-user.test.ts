import request from "supertest";
import { app } from "../../app";

it("auth user ok", async () => {
  const cookie = await signin()

  const res = await request(app)
    .get("/api/users/currentuser")
    .set('Cookie', cookie)
    .send()
    .expect(200)

  // console.log(res.body)
  expect(res.body.currentUser.email).toEqual('ana@gmail.com')
});

it("auth user fail", async () => {
  const res = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200)

  expect(res.body.currentUser).toEqual(null)
});
