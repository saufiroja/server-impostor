const router = require('express').Router();

const {
  login,
  register,
  forgotPassword,
  resetPassword,
} = require('../controllers/auth.controllers');

router.post('/login', login);
router.post('/register', register);
router.put('/forgot-password', forgotPassword);
router.put('/reset-password', resetPassword);

module.exports = router;
