const assert = require('chai').assert;
const httpsRequest = require('../utils/HTTPSRequest');


describe('getTeamDataById', async function(){
  this.timeout(5000);
  it('teamdId1', async function(){
    let data = await httpsRequest.getRequest('https://statsapi.web.nhl.com/api/v1/teams/1/stats');
    data = JSON.parse(data);
    assert.equal(data.stats[0].splits[0].team.id, '1', 'Отсутствует команда с данным id');
    assert.equal(data.stats[0].splits[0].team.name, 'New Jersey Devils', 'Название команды не соответствует тесту');
  });
  it('teamdId12', async function(){
    let data = await httpsRequest.getRequest('https://statsapi.web.nhl.com/api/v1/teams/12/stats');
    data = JSON.parse(data);
    assert.equal(data.stats[0].splits[0].team.id, '12', 'Отсутствует команда с данным id');
    assert.equal(data.stats[0].splits[0].team.name, 'Carolina Hurricanes', 'Название команды не соответствует тесту');
  });
  it('teamdId22', async function(){
    let data = await httpsRequest.getRequest('https://statsapi.web.nhl.com/api/v1/teams/22/stats');
    data = JSON.parse(data);
    assert.equal(data.stats[0].splits[0].team.id, '22', 'Отсутствует команда с данным id');
    assert.equal(data.stats[0].splits[0].team.name, 'Edmonton Oilers', 'Название команды не соответствует тесту');
  });
});
