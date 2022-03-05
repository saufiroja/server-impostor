const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../database/models');

const { JWT_SECRET, JWT_EXPRISES_IN } = process.env;

// Desc : Generate token
const generateToken = (user) => {
  const payload = { id: user.id, email: user.email };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPRISES_IN });
  return token;
};

// Desc : Register a new user
// Route : POST /api/register
// Access : Public
const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const isExists = await User.findOne({ where: { email } });

    if (isExists) {
      return res.status(400).json('Email already exists');
    }
    const hash = await bcrypt.hash(password, 12);

    const user = await User.create({ username, email, password: hash });
    const token = generateToken(user);

    return res.status(201).json({
      message: 'User created successfully',
      user,
      accessToken: token,
    });
  } catch (error) {
    next(error);
  }
};

// Desc : Login a user
// Route : POST /api/login
// Access : Public
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('invalid email');
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error('invalid password');
    }

    const token = generateToken(user);
    return res.status(200).json({
      message: 'User logged in successfully',
      user,
      accessToken: token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
