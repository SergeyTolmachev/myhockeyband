const assert = require('chai').assert;


const gameModel = require('../models/gameModel');

describe('gameModel', async function(){
  this.timeout(5000);
  it('#checkGameTimeCreated.28.true', async function(){
    const result = await gameModel.checkGameTimeCreated('28');
    assert.equal(result, true, 'Игра создана менее 5 минут назад');
  });
  it('#checkGameTimeCreated.18.false', async function(){
    const result = await gameModel.checkGameTimeCreated('18');
    assert.equal(result, false, 'Обновление игры невозможно, нет игры созданной таким пользователем');
  });
  it('#checkGameToUpdate.11.true', async function(){
    const result = await gameModel.checkGameToUpdate('11');
    assert.equal(result, true, 'Обновление игры невозможно');
  });
  it('#checkGameToUpdate.22.false', async function(){
    const result = await gameModel.checkGameToUpdate('22');
    assert.equal(result, false, 'Обновление игры невозможно');
  });
  it('#getGameData.23.true', async function(){
    const result = await gameModel.getGameData('23');
    assert.isNotNull(result,'Невозможно получить данные игры');
  });
  it('#getGameData.12.false', async function(){
    const result = await gameModel.getGameData('12');
    assert.equal(result, false, 'Данные игры ошибочно прочтены');
  });

});
