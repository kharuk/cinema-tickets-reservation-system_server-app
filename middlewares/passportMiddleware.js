//const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const configAuth = require('../config/tokenConfig');

/* const getToken = (req) => {
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  return token || null;
}; */

const generateToken = (id) => {
  const token = jwt.sign(
  {
    id,
    exp: Math.floor(Date.now() / 1000) + parseInt(configAuth.JWT.live)
  },
  configAuth.JWT.secret);
  return {token: "bearer " + token}
};

module.exports = {
  generateToken
};
