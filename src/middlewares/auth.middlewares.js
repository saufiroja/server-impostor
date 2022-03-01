const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const isAuthentication = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(' ')[1];
  if (!token) {
    throw new Error('unauthorized');
  }
  try {
    const result = jwt.verify(token, JWT_SECRET, { ignoreExpiration: true });
    req.user = result;
  } catch (error) {
    return res.status(403).json({
      message: 'unauthorized',
      code: 403,
      error,
    });
  }
  return next();
};

module.exports = { isAuthentication };
