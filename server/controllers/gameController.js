const userModel = require('../models/userModel');
const gameModel = require('../models/gameModel');
const matchModel = require('../models/matchModel');


module.exports.createGame = async (req, res) => {
  if (await gameModel.checkDataToCreateGame(req.body.guest)) {
    res.status(400).json({ message: 'отправлены не все данные для создания игры' });
  }
  if (await gameModel.checkDataToCreateGame(req.body.home)) {
    res.status(400).json({ message: 'отправлены не все данные для создания игры' });
  }
  const playerId = await userModel.checkPlayerExists(req.body.decoded.login);
  if (!playerId) {
    return res.status(401).json({message: 'Данный пользователь не может создавать игры'});
  }

  if (!(await gameModel.checkGameTimeCreated(playerId))) {
    return res.status(401).json({message: 'Игры можно создавать не чаще 1 раза в 5 минут'});
  }

  const matchToCreate = {
    playerGuestId: req.body.guest.playerId,
    playerHomeId: req.body.home.playerId,
    teamGuestId: req.body.guest.teamId,
    teamHomeId: req.body.home.teamId,
    goalsGuest: req.body.guest.goals,
    goalsHome: req.body.home.goals,
    createdTime: new Date(),
    createdById: playerId,
  };

  const gameId = await matchModel.createMatch(matchToCreate);
  let splitPowerPlaysGuest = req.body.guest.powerPlays.split('/');
  let splitFaceToFacesGuest = req.body.guest.faceToFace.split('/');

  const gameToCreateGuest = {
    playerId: req.body.guest.playerId,
    teamId: req.body.guest.teamId,
    goals: req.body.guest.goals,
    shoots: req.body.guest.shoots,
    hits: req.body.guest.hits,
    timeInAttack: req.body.guest.timeInAttack,
    passes: req.body.guest.passes,
    penaltyTime: req.body.guest.penaltyTime,
    powerPlays: splitPowerPlaysGuest[1],
    powerPlaysDone: splitPowerPlaysGuest[0],
    faceToFace: splitFaceToFacesGuest[1],
    faceToFaceDone: splitFaceToFacesGuest[0],
    faceOffDone: req.body.guest.faceOffDone,
    minutesPowerPlay: req.body.guest.minutesPowerPlays,
    minorityGoals: req.body.guest.minorityGoals,
    createdById: playerId,
    createdAtTime: matchToCreate.createdTime,
    gameId: gameId,
    statusPlayer: 'guest',
  };

  let splitPowerPlaysHome = req.body.home.powerPlays.split('/');
  let splitFaceToFacesHome = req.body.home.faceToFace.split('/');

  const gameToCreateHome = {
    playerId: req.body.home.playerId,
    teamId: req.body.home.teamId,
    goals: req.body.home.goals,
    shoots: req.body.home.shoots,
    hits: req.body.home.hits,
    timeInAttack: req.body.home.timeInAttack,
    passes: req.body.home.passes,
    penaltyTime: req.body.home.penaltyTime,
    powerPlays: splitPowerPlaysHome[1],
    powerPlaysDone: splitPowerPlaysHome[0],
    faceToFace: splitFaceToFacesHome[1],
    faceToFaceDone: splitFaceToFacesHome[0],
    faceOffDone: req.body.home.faceOffDone,
    minutesPowerPlay: req.body.home.minutesPowerPlays,
    minorityGoals: req.body.home.minorityGoals,
    createdById: playerId,
    createdAtTime: matchToCreate.createdTime,
    gameId: gameId,
    statusPlayer: 'home',
  };

  if (await gameModel.createGame(gameToCreateGuest)) {
    if (await gameModel.createGame(gameToCreateHome)){
      return res.status(200).send('Игра успешно создана');
    }
  }
  return res.status(401).send('Ошибка при создании игры');
};


module.exports.updateGame = async (req, res) => {
  if (!await gameModel.checkGameToUpdate(req.body.gameId)) {
    return res.status(404).send('Обновление игры невозможно');
  }
  const userId = await userModel.checkPlayerExists(req.body.decoded.login);

  if (!await userModel.checkCreator(userId, req.body.gameId)) {
    return res.status(401).send('Отсутствуют права для обновления игры');
  }

  const gameToUpdate = {
    gameStatus: 'played',
    goalsGuest: req.body.goalsGuest,
    goalsHome: req.body.goalsHome,
    shootsGuest: req.body.shootsGuest,
    shootsHome: req.body.shootsHome,
    hitsGuest: req.body.hitsGuest,
    hitsHome: req.body.hitsHome,
    timeInAttackGuest: req.body.timeInAttackGuest,
    timeInAttackHome: req.body.timeInAttackHome,
    passesGuest: req.body.passesGuest,
    passesHome: req.body.passesHome,
    penaltyTimeGuest: req.body.penaltyTimeGuest,
    penaltyTimeHome: req.body.penaltyTimeHome,
    powerPlaysGuest: req.body.powerPlaysGuest,
    powerPlaysDoneGuest: req.body.powerPlaysDoneGuest,
    powerPlaysHome: req.body.powerPlaysHome,
    powerPlaysDoneHome: req.body.powerPlaysDoneHome,
    faceToFaceGuest: req.body.faceToFaceGuest,
    faceToFaceDoneGuest: req.body.faceToFaceDoneGuest,
    faceToFaceHome: req.body.faceToFaceHome,
    faceToFaceDoneHome: req.body.faceToFaceDoneHome,
    minorityGoalsGuest: req.body.minorityGoalsGuest,
    minorityGoalsHome: req.body.minorityGoalsHome,
  };


  if (await gameModel.updateGame(req.body.gameId, gameToUpdate)) {
    return res.status(201).send('Данные игры успешно обновлены');
  }
  return res.status(404).send('Ошибка при обновлении игры');
};


module.exports.getGameData = async (req, res) => {
  const gameData = await gameModel.getGameData(req.params.gameId);
  if (gameData) {
    return res.status(200).json(gameData);
  }
  res.status(404).json({ message: 'Отсутствует запрашиваемая игра' });
};

module.exports.getAllGameData = async (req, res) => {
  const gameData = await matchModel.getAllMatchesData(req.params.playerId);
  if (gameData) {
    return res.status(200).json(gameData);
  }
  res.status(404).json({ message: 'Отсутствуют игры у запрашиваемого пользователя' });

};
