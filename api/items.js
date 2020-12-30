const express = require('express');
const router = express.Router();

const validateRequest = require('../middlewares/validate-request')
const validateUserInput = require('../middlewares/validate-user-input.js')


const ItemsController = require('../controllers/ItemsController');
const currentUser = require('../middlewares/current-user');



router.get('/myitems', currentUser, ItemsController.findMyItems);
router.get('/item', currentUser, ItemsController.findOneItem);
router.post('/add', validateRequest, ItemsController.addNewItem);

// router.post('/signup', validateUserInput.validateEmailPasswordUsernameCountry(), validateRequest, AuthController.signup);
// router.post('/signout', AuthController.signout);



module.exports = router;