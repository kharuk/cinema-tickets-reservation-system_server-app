const mongoose = require('mongoose');
let bcrypt = require('bcrypt-nodejs');
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
    type: String, enum: ['male', 'female', 'other'], default: 'male'
  },
});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.hashPassword);
};

UserSchema.methods.returnUserInfo = function() {
  return {
    _id: this._id,
    email: this.email,
    role: this.accountType,
    location: this.location
  };
};
module.exports = mongoose.model('User', UserSchema);