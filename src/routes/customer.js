const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/registro', customerController.registro);
router.get('/login', customerController.login);
router.post('/loginya', customerController.loginya);
router.post('/add', customerController.save);
router.post("/registrarproducto",customerController.ingresar_producto)
router.get('/categorias', customerController.categorias);
router.get('/insertar', customerController.insertar);
router.get('/', customerController.principal);
module.exports = router;