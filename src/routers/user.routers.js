const router = require('express').Router();

const {
  getAllUser,
  getProfileUser,
  getUserById,
  updateScore,
  updateUser,
} = require('../controllers/user.controllers');

router.get('/users', getAllUser);
router.get('/user/:username', getProfileUser);
router.get('/users/:id', getUserById);

router.put('/users/:id', updateUser);
router.put('/users/score/:id', updateScore);

module.exports = router;
