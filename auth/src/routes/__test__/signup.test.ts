import request from "supertest";
import { app } from "../../app";

it('return 201 on signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'layla@email.com',
            password: '12345678'
        })
        .expect(201)
})

it('return 400 on invalid body', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'layla@email.com',
            password: '5678'
        })
        .expect(400)
})