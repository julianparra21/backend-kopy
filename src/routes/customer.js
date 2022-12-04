const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/registro', customerController.registro);
router.get('/login', customerController.login);
router.post('/loginya', customerController.loginya);
router.post('/add', customerController.save);
router.get('/', customerController.principal);
module.exports = router;