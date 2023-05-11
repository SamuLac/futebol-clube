import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/TeamModel';
import TeamService from '../services/TeamService';

chai.use(chaiHttp);

const { expect } = chai;
const teams = [
  {
    id: 1,
    teamName: 'Cruzeiro'
  },
]

describe('Testa endpoint /teams', () => {

  it('testa se retorna arraay de times, com status duzentos', async () => {
    sinon.stub(TeamService, 'getAllTeams').resolves(teams as Team[])
    const response = await chai.request(app).get('/teams')

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.deep.equal(teams)
  } )

});