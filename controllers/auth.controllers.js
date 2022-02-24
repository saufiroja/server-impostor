const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const { kirimEmail } = require('../helper');

const { User } = require('../database/models');

const { JWT_SECRET, JWT_EXPRISES_IN } = process.env;

// REGIER USER
const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const isExists = await User.findOne({ where: { email } });

    if (isExists) {
      return next(createError(400, 'User with this email already exists'));
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

// LOGIN USER
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(createError(400, 'invalid email'));
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return next(createError(400, 'Invalid password'));
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

// FORGET PASSWORD
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({
        status: false,
        message: 'Email tidak terdaftar',
      });
    }

    const token = signToken(user.id);
    console.log('token:', token);

    await user.update({ resetPasswordLink: token });

    const templateEmail = {
      from: 'IMPOSTOR TEAM',
      to: email,
      subject: 'Link Reset Password',
      html: `<p>Silakan klik link di bawah ini untuk reset password Anda! </p> <p>${process.env.CLIENT_URL}/reset-password/${token}</p>`,
    };

    kirimEmail(templateEmail);

    return res.status(200).json({
      status: true,
      email: 'Link reset password berhasil terkirim!',
    });
  } catch (error) {
    next(error);
  }
};

// RESET PASSWORD
const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    console.log('token:', token);
    console.log('password:', password);

    const user = await User.findOne({
      where: {
        resetPasswordLink: token,
      },
    });
    console.log(user);
    if (user) {
      const hash = await bcrypt.hash(password, 12);
      user.password = hash;
      await user.save();
      return res.status(201).json({
        status: true,
        message: 'password berhasil diganti',
      });
    }
  } catch (error) {
    next(error);
  }
};

// GENERATE TOKEN
const generateToken = (user) => {
  const payload = { id: user.id, email: user.email };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPRISES_IN });
  return token;
};

module.exports = { register, login, forgotPassword, resetPassword };
