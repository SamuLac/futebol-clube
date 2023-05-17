import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs'
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import User from '../database/models/UsersModel';
import JTW from '../utils/JTW';

chai.use(chaiHttp);
const { expect } = chai;
const fieldMessage = { message: 'All fields must be filled' };
const token = {token: 'token'}
const mockUser = {
  id: 1,
  username: 'omaior',
  role: 'admin',
  email: 'samus@samus.com',
  password: bcrypt.hashSync('senha123', 10)
}
const invalidMessage = { message: 'Invalid email or password' };
describe('Testa endpoint /login', () => {
    it('Sem enviar email', async () => {
      const response = await chai.request(app).post('/login').send({ password: 'senha123' });
  
      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal(fieldMessage);
    });
    it('Sem enviar senha', async () => {
      const response = await chai.request(app).post('/login').send({ email: 'samus@samus.com' });
  
      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal(fieldMessage);
    });
    it('Tudo correto', async () => {
      sinon.stub(User, 'findOne').resolves(User.build(mockUser));
    sinon.stub(JTW, 'generateToken').resolves('token')
    const response = await chai.request(app).post('/login').send({
      email: 'samus@samus.com',
      password: 'senha123', 
    });
  
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(token);
    })
  
    it('Enviando email incorreto', async() => {
      sinon.stub(User, 'findOne').resolves(undefined);
      const response = await chai.request(app).post('/login').send({
        email: 'email_incorreto@samus.com',
        password: mockUser.password,
      })
  
      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal(invalidMessage);
    })
    it('Enviando senha incorreta', async() => {
      sinon.stub(User, 'findOne').resolves(User.build(mockUser))
      const response = await chai.request(app).post('/login').send({
        email: mockUser.email,
        password: 'senha_falsa123',
      })
  
      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal(invalidMessage);
  
    })
    afterEach(() => {
      sinon.restore()
    })
});