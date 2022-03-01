const jwt = require('jsonwebtoken');

const { JWT_SECRET, JWT_EXPRISES_IN } = process.env;

// GENERATE TOKEN
const generateToken = (user) => {
  const payload = { id: user.id, email: user.email };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPRISES_IN });
  return token;
};

module.exports = { generateToken };
