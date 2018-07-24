const express = require('express');

const router = express.Router();

const authenticateController = require('../controllers/authenticateController');


router.post('/', authenticateController.authenticate);


module.exports = router;
