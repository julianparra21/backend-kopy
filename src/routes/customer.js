const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/registro', customerController.registro);
router.get('/login', customerController.login);
router.post('/loginya', customerController.loginya);
router.post('/add', customerController.save);
router.post('/addAdmin',customerController.saveAdmin);
router.post("/insertarProducto",customerController.ingresar_producto)
router.get('/categorias', customerController.categorias);
router.get('/catalogo', customerController.catalogo);
router.get('/catalogoAdmin',customerController.catalogoAdmi);
router.get('/insertar', customerController.insertar);
router.get('/select', customerController.selec_us);
router.get('/ResAd',customerController.registroAdmin);
router.get('/principal_Admin', customerController.principalAdmin);
router.get('/', customerController.principal);
module.exports = router;