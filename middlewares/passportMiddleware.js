const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');

configAuth = {
  JWT: {
  secret: 'qwerty',
  live: 360000000
  }
}

const getTokenFromCookies = (req) => {
  //const token = req.cookies['token'];
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  console.log('token from cookies', token);
  return token || null;
};

const generateToken = (id) => {
  const token = jwt.sign(
  {
    id,
    exp: Math.floor(Date.now() / 1000) + parseInt(configAuth.JWT.live)
  },
  configAuth.JWT.secret);
  return token
};

module.exports = {
  required: expressJwt({
    secret: configAuth.JWT.secret,
    userProperty: 'user',
    getToken: getTokenFromCookies
  }),
  generateToken
};
