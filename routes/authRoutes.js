const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');
const AuthMiddleware = require('../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/prueba',AuthMiddleware.verificarToken,authController.prueba); // middleware verifica el token pasa al controlador

module.exports = router;