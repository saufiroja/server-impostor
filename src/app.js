require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const cors = require('cors');

// CONNECTION DATABASE
require('./database/models/sequelize');

// IMPORT ROUTER
const authRouter = require('./routers/auth.routers');
const userRouter = require('./routers/user.routers');

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors({ origin: 'https://impostor-game-web.netlify.app' }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  next();
});

// ROUTER
app.use('/api', authRouter);
app.use('/api', userRouter);

// ERROR HANDLING
app.use((err, req, res, next) => {
  const { message, code = 500, error = 'internal server error' } = err;
  return res.status(code).json({
    message,
    code,
    error,
  });
});

module.exports = { app };
