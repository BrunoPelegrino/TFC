import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import  { app }  from '../app';
import User from '../database/models/UserModel';

import { Response } from 'superagent';
import { userMock } from './mocks/loginMock';
import { token } from './mocks/tokenMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota de login', () => {
  describe('Testa a rota /', () => {

    let chaiHttpResponse: Response;
  
    beforeEach(async () => {
      sinon.stub(User, "findOne").resolves(userMock as unknown as User);
      sinon.stub(jwt, 'sign').resolves(token);
    });
  
    afterEach(()=>{
      (User.findOne as sinon.SinonStub).restore();
      (jwt.sign as sinon.SinonStub).restore();
    })
  
    it('testa login com campos válidos', async () => {
      const chaiHttpResponse = await chai.request(app)
         .post('/login')
         .send({
          email: 'admin@admin.com',
          password: "secret_admin",
        })
  
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal({
        token: token,
      });
    });
  
    it('testa se nao é possivel fazer login sem o campo email', async () => {
      const chaiHttpResponse = await chai.request(app)
         .post('/login')
         .send({
          password: "secret_admin",
        })
  
      expect(chaiHttpResponse.status).to.equal(400);
      expect(chaiHttpResponse.body).to.deep.equal({
        message: 'All fields must be filled',
      });
    });
  
    it('testa nao é possivel fazer login sem o campo password', async () => {
      const chaiHttpResponse = await chai.request(app)
         .post('/login')
         .send({
          email: 'admin@admin.com',
        })
  
      expect(chaiHttpResponse.status).to.equal(400);
      expect(chaiHttpResponse.body).to.deep.equal({
        message: 'All fields must be filled',
      });
    });

    it('testa nao é possivel fazer login sem o campo password com menos de 6 caracteres', async () => {
      const chaiHttpResponse = await chai.request(app)
         .post('/login')
         .send({
          email: 'admin@admin.com',
          password: "inval",
        })
  
      expect(chaiHttpResponse.status).to.equal(400);
      expect(chaiHttpResponse.body).to.deep.equal({
        message: 'Password must be at least 6 characters',
      });
    });
  
    it('testa se nao é permitido login com a senha invalida', async () => {
      const chaiHttpResponse = await chai.request(app)
         .post('/login')
         .send({
          email: 'admin@admin.com',
          password: "invalid_admin",
        })
  
      expect(chaiHttpResponse.status).to.equal(401);
      expect(chaiHttpResponse.body).to.deep.equal({
        message: 'Incorrect email or password',
      });
    });

    it('testa se nao é permitido login com a email invalido', async () => {
      const chaiHttpResponse = await chai.request(app)
         .post('/login')
         .send({
          email: 'invalid@admin.com',
          password: "secret_admin",
        })
  
      expect(chaiHttpResponse.status).to.equal(401);
      expect(chaiHttpResponse.body).to.deep.equal({
        message: 'Incorrect email or password',
      });
    });
  });
  
  describe('Testa a rota "/validate"', () => {
  
    let chaiHttpResponse: Response;
  
    beforeEach(async () => {
      sinon.stub(User, "findByPk").resolves(userMock as unknown as User);
    });
  
    afterEach(()=>{
      (User.findByPk as sinon.SinonStub).restore();
      (jwt.verify as sinon.SinonStub).restore();
    })
  
  
    it('testa se o acesso é permitido com o token valido', async () => {
      sinon.stub(jwt, 'verify').resolves(userMock);
      const chaiHttpResponse = await chai.request(app)
         .get('/login/validate')
         .set('Authorization', token);
    
      expect(chaiHttpResponse.status).to.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal({
        role: 'admin',
      });
    });
    
  });

});