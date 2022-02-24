const { Op } = require('sequelize');
const createError = require('http-errors');
const { User } = require('../database/models');

// GET ALL USER
const getAllUser = async (req, res, next) => {
  try {
    const user = await User.findAll();
    return res.status(200).json({
      message: 'success get all user',
      code: 200,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// GET PROFILE USER
const getProfileUser = async (req, res, next) => {
  const { username } = req.params;
  const user = await User.findOne({
    attributes: ['id', 'name', 'email', 'username', 'avatar', 'bio', 'score'],
    where: { username },
  });

  if (!user) {
    return next(createError(404, 'User not found'));
  }

  return res.status(200).json({
    message: 'success get profile user',
    code: 200,
    user,
  });
};

// SERACH USER
const searchUser = async (req, res, next) => {
  try {
    const { search } = req.query;
    const user = await User.findAll({
      where: { username: { [Op.like]: `%${search}%` } },
    });

    if (!user) {
      throw new Error('user not found');
    }

    return res.status(200).json({
      message: 'success search user',
      code: 200,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE USER
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, bio, name } = req.body;

    const updateUser = await User.update(
      { username, bio, name },
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
      status: 'success',
      code: 201,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// GET USER BY ID
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return next(createError(404, 'User not found'));
    }

    return res.status(200).json({
      message: 'success get user by id',
      code: 200,
      user,
    });
  } catch (error) {
    next(error);
  }
};

//UPDATE SCORE
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
      status: 'success',
      code: 201,
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUser,
  getProfileUser,
  searchUser,
  updateUser,
  getUserById,
  updateScore,
};
