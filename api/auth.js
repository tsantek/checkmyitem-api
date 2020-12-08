const express = require('express');
const router = express.Router();

const validateRequest = require('../middlewares/validate-request')
const validateUserInput = require('../middlewares/validate-user-input.js')


const AuthController = require('../controllers/AuthController.js');
const currentUser = require('../middlewares/current-user');



router.get('/verify', currentUser, AuthController.verify);
// router.post('/login', validateUserInput.validateEmailPassword(), validateRequest, AuthController.login);
router.post('/signup', validateUserInput.validateEmailPasswordUsernameCountry(), validateRequest, AuthController.signup);
router.post('/signout', AuthController.signout);



module.exports = router;