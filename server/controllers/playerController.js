const userModel = require('../models/userModel');
const statisticModel = require('../models/statisticModel');


module.exports.getPlayerData = async (req, res) => {
  let playerData = await userModel.getUserData(req.params.playerId);
  if (playerData){
    return res.status(200).json(playerData);
  }
  res.status(404).json({message: 'Отсутствует запрашиваемый пользователь'});
};


module.exports.getAllPlayersData = async (req, res) => {
  let playerData = await userModel.getAllUsersData();
  if (playerData){
    return res.status(200).json(playerData);
  }
  res.status(404).json({message: 'Отсутствуют пользователи в базе данных'});
};


module.exports.getAllPlayersStatistic = async (req, res) => {
  let playersStats = await statisticModel.getAllUsersStatistic();
  if (playersStats){
    return res.status(200).json(playersStats);
  }
  res.status(404).json({message: 'Отсутствуют пользователи в базе данных'});
};

module.exports.updatePlayerData = async (req, res) => {
  const userToUpdate = { ...req.body };
  delete userToUpdate.password;
  delete userToUpdate.login;
  delete userToUpdate.email;
  if (await userModel.updateUserData(req.body.decoded.login, userToUpdate)){
    return res.status(201).json({message: 'Данные пользователя успешно обновлены'});
  }
  res.status(401).json({message: 'Ошибка обновления данных пользователя'});
};
