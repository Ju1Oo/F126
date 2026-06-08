const express = require('express');
const router = express.Router();

const userController = require('../controllers/userControllers');

router.get('/', (req, res) => {
    res.render('index');
});



router.get('/login', userController.showLogin);
router.post('/login', userController.login);

router.get('/register', userController.showRegister);
router.post('/register', userController.register);

router.get('/logout', userController.logout);

router.get('/market', userController.showMarket);

router.get('/item/:id', userController.showItemDetails);

router.get('/user/profile', userController.showProfile);

router.post('/user/profile/add-item', userController.addItem);
router.get('/item/edit/:id',userController.showEditItem);
router.post('/item/edit/:id',userController.updateItem);
router.post('/item/delete/:id', userController.deleteItem);

router.post('/item/close/:id', userController.closeItem);

module.exports = router;