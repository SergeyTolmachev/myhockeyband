const userModel = require('../models/userModel');


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

module.exports.updatePlayerData = async (req, res) => {
  const userId = await userModel.checkPlayerExists(req.body.decoded.login);
  if (userId != req.params.playerId){
    return res.status(401).json({message: 'нет прав для обновления информации'});
  }
  const userToUpdate = { ...req.body };
  delete userToUpdate.password;
  delete userToUpdate.login;
  delete userToUpdate.email;
  if (await userModel.updateUserData(req.params.playerId, userToUpdate)){
    return res.status(201).json({message: 'Данные пользователя успешно обновлены'});
  }
  res.status(401).json({message: 'Ошибка обновления данных пользователя'});
};
