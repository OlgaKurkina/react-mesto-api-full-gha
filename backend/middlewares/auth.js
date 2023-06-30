const jwt = require('jsonwebtoken');
const { UnAuthorized } = require('../utils/errors/errors');

const { NODE_ENV, SECRET_KEY } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnAuthorized('Необходима авторизация'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? SECRET_KEY : 'dev-secret');
  } catch (err) {
    return next(new UnAuthorized('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};
