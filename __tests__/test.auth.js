import request from 'supertest';
import chai from 'chai';
import User from '../models/user.js';
import app from '../App.js'

const { expect } =chai;

describe ('Test auth endpoints', ()=> {
  it('Allow create users', async ()=> {
    const payload = {
      'name': 'peter',
      'email': 'pruebas1234@gmail.com',
      'password': 'peter2022'
    }
    const { body, status } = await request(app).post('/auth/register').send(payload);
    expect(status).to.equal(201);

    expect(body).to.have.property('id');
    const id = body.id;
    const user = await User.findByPk(id);
    expect(user.name).to.equal(payload.name);
  });

  // it('payload incomplete return 400', async ()=>{
  //   const payload = {
  //     'name': 'irene',
  //     'password': 'irene2022'
  //   }
  //   const { status } = await request(app).post('/auth/register').send(payload);
  //   expect(status).to.equal(400);
  // });
});