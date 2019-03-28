const passport = require('passport');
const User = require('../models/userModel');

const jwt = require ("jsonwebtoken");
configAuth = {
  JWT: {
  secret: 'qwerty',
  live: process.env.JWT_LIVE
  }
}

const generateToken = (id) => {
  const token = jwt.sign(
    {
      id,
      exp: Math.floor(Date.now() / 1000) + parseInt(configAuth.JWT.live)
    },
    configAuth.JWT.secret);
  return {token: "bearer " + token}
};


  const register = async (payload) => {
    //const {} = payload;
    const {firstName, lastName, location, gender, email, password} = payload;
  //  console.log("payload",payload.firstName);
    try {
      const user = await User.findOne({'email': email});
      if (user) return {message: 'That email is already taken.'};
  
      const newUser = new User();
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.email = email;
      newUser.hashPassword =newUser.generateHash(password);
      newUser.location = location;
      newUser.gender = gender;
     // console.log(newUser);
    //  newUser.email = email;
     // newUser.hashPassword = newUser.generateHash(password);
     // await newUser.save();
      const save = await newUser.save();
        if (!save) {
          console.error({ message: 'Error with connection' });
        } else {
          console.log({ message: 'Saved' });
        }
  
      return generateToken(newUser.id)
  
    } catch (error) {
      console.error(error);
      return {success: false, message: 'Registration failed.'}
    }
  };

const login = async (payload) => {
  const {email, password} = payload;

  try {
    const user = await User.findOne({'email': email});
    if (!user) return {message: 'No user found.'};

    if (!user.validatePassword(password))
      return {message: 'Oops! Wrong password.'};

    return generateToken(user.id)

  } catch (error) {
    console.error(error);
    return {success: false, message: 'Authentication failed.'}
  }
};

function getPrivateInfo(req, res) {

}

function logout(req, res) {

}

module.exports = {
  register,
  login,
  getPrivateInfo,
  logout
};
