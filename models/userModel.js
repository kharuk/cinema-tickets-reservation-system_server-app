const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    required: true
  },
  lastName: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  hashPassword: {
    type: String,
    trim: true,
    required: true
  },
  location: {
    type: String,
    trim: true,
    required: true
  },
  accountType: {
    type: String, enum: ['User', 'Admin'], default: 'User'
  },
  gender: {
    type: String, enum: ['Male', 'Female', 'Other'], default: 'Male'
  },
});

UserSchema.pre('save', function(next) {
  this.hashPassword = bcrypt.hashSync(this.hashPassword, saltRounds);
    next();
  }
);

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.hashPassword);
};

UserSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      email: this.email,
      role: this.accountType,
      id: this._id,
      exp: parseInt(expirationDate.getTime() / 1000, 10)
    },
    'secret'
  );
};

UserSchema.methods.returnUserInfo = function() {
  return {
    _id: this._id,
    email: this.email,
    role: this.accountType
  };
};
module.exports = mongoose.model('User', UserSchema);