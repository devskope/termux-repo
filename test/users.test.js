import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../src/server';
import { users } from '../src/datastores/userData';

const { expect } = chai;
chai.use(chaiHttp);

const ROOT_URL = `/api/v1`;

describe('Users', () => {
  const newUser = {
    username: `martin-Skope`,
    password: `blabla`,
    email: `nyet@pillow.me`
  };

  it('Should register new user', () => {
    chai
      .request(server)
      .post(`${ROOT_URL}/users/register`)
      .send(newUser)
      .end((err, res) => {
        expect(res.status).eq(201);
      });
  });

  it('Should save user to datastore', () => {
    expect(Boolean(users.findByUsername(newUser.username))).eq(true);
  });

  it('Registered user can login', () => {
    chai
      .request(server)
      .post(`${ROOT_URL}/users/login`)
      .send(newUser)
      .end((err, res) => {
        expect(res.status).eq(200);
        expect(res.body.message).eq(`successful login as ${newUser.username}`);
      });
  });
  
  it('logged in user redirected on login visit', () => {
    chai
      .request(server)
      .get(`${ROOT_URL}/users/login`)
      .end((err, res) => {
        expect(res.status).eq(307);
      });
  });
});






