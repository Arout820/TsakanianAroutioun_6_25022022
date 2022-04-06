const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controllers');
const passwordValidator = require('../middleware/password-validator');

router.post('/signup', passwordValidator, userController.signup);
router.post('/login', userController.login);

module.exports = router;

