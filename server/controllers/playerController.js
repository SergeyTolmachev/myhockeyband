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
