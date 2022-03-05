const { User } = require('../database/models');

// Desc : Get all user
// Method : GET
// Url : /api/users
// Access : Public
const getAllUser = async (req, res, next) => {
  try {
    const user = await User.findAll();
    return res.status(200).json({
      message: 'success get all user',
      user,
    });
  } catch (error) {
    next(error);
  }
};

// Desc : Get profile user
// Method : GET
// Url : /api/user/:username
// Access : Public
const getProfileUser = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({
      attributes: ['id', 'name', 'email', 'username', 'avatar', 'bio', 'score'],
      where: { username },
    });

    if (!user) {
      return res.status(404).json({
        result: 'failed',
        message: 'user not registered',
      });
    }

    return res.status(200).json({
      message: 'success get profile user',
      user,
    });
  } catch (error) {
    next(error);
  }
};

// Desc : Get user by id
// Method : GET
// Url : /api/users/:id
// Access : Public
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({
        result: 'failed',
        message: 'user not registered',
      });
    }

    return res.status(200).json({
      message: 'success get user by id',
      user,
    });
  } catch (error) {
    next(error);
  }
};

// Desc : Update user
// Method : PUT
// Url : /api/users/:id
// Access : Private
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, bio, name, avatar } = req.body;

    const updateUser = await User.update(
      { username, bio, name, avatar },
      { where: { id } }
    );

    if (!updateUser) {
      throw new Error('user not found');
    }

    const user = await User.findOne({
      attributes: ['id', 'name', 'username', 'avatar', 'bio', 'score'],
      where: {
        id,
      },
    });

    return res.status(201).json({
      status: 'success update user',
      user,
    });
  } catch (error) {
    next(error);
  }
};

// Desc : Update score user
// Method : PUT
// Url : /api/users/score/:id
// Access : Private
const updateScore = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { score } = req.body;

    const updateScore = await User.update({ score }, { where: { id } });
    if (!updateScore) {
      throw new Error('user not found');
    }

    const user = await User.findOne({
      attributes: ['id', 'name', 'username', 'avatar', 'bio', 'score'],
      where: {
        id,
      },
    });

    return res.status(201).json({
      message: 'success update score user',
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUser,
  getProfileUser,
  updateUser,
  getUserById,
  updateScore,
};
