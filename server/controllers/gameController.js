const gameClass = require('../classes/gameClass');


module.exports.createGame = async (req, res) => {
  if (req.body.playerGuestId && req.body.playerHomeId) {
    const playerId = await gameClass.checkPlayerExists(req.body.decoded.login);
    if (!playerId) {
      return res.status(401).send('Данный пользователь не может создавать игры');
    }

    if (!(await gameClass.checkGameTimeCreated(playerId))) {
      return res.status(401).send('Игры можно создавать не чаще 1 раза в 5 минут');
    }

    const date = new Date(Date.now() + (7 * 24 * 60 * 60 * 1000));
    const gameToCreate = {
      gameDate: req.body.gameDate || date,
      gameStatus: 'pending',
      playerGuestId: req.body.playerGuestId,
      playerHomeId: req.body.playerHomeId,
      teamGuestId: null,
      teamHomeId: null,
      goalsGuest: null,
      goalsHome: null,
      shootsGuest: null,
      shootsHome: null,
      hitsGuest: null,
      hitsHome: null,
      timeInAttackGuest: null,
      timeInAttackHome: null,
      passesGuest: null,
      passesHome: null,
      penaltyTimeGuest: null,
      penaltyTimeHome: null,
      powerPlaysGuest: null,
      powerPlaysDoneGuest: null,
      powerPlaysHome: null,
      powerPlaysDoneHome: null,
      faceToFaceGuest: null,
      faceToFaceDoneGuest: null,
      faceToFaceHome: null,
      faceToFaceDoneHome: null,
      minorityGoalsGuest: null,
      minorityGoalsHome: null,
      createdById: playerId,
      createdAtTime: new Date(),
    };

    if (await gameClass.createGame(gameToCreate)) {
      return res.status(200).send('Игра успешно создана');
    }
    return res.status(401).send('Ошибка при создании игры');
  }
  res.status(400).send('Отправлены не все требуемые данные');
};


module.exports.updateGame = async (req, res) => {
  if (!await gameClass.checkGameToUpdate(req.body.gameId)) {
    return res.status(404).send('Обновление игры невозможно');
  }
  const userId = await gameClass.checkPlayerExists(req.body.decoded.login);

  if (! await gameClass.checkCreator(userId, req.body.gameId)) {
    return res.status(401).send('Отсутствуют права для обновления игры');
  }

  const gameToUpdate = {
    gameStatus: 'played',
    //teamGuestId: req.body.teamGuestId,
    //teamHomeId: req.body.teamHomeId,
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


  if (await gameClass.updateGame(req.body.gameId, gameToUpdate)) {
    return res.status(201).send('Данные игры успешно обновлены');
  }
  return res.status(404).send('Ошибка при обновлении игры');
};
