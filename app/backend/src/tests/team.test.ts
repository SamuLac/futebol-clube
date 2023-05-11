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
    id: 5,
    teamName: 'Cruzeiro'
  },
]

describe('Testa endpoint /teams', () => {

  it('testa getAllTeams', async () => {
    sinon.stub(TeamService, 'getAllTeams').resolves(teams as Team[])
    const response = await chai.request(app).get('/teams')

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.deep.equal(teams)
  } )

  it('testa getTeamByID', async () => {
    sinon.stub(TeamService, 'getTeamById').resolves(teams[0] as Team)
    const response = await chai.request(app).get('/teams/5')

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.deep.equal(teams[0])
  } )
});