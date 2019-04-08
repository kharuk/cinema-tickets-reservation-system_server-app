const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Session = require('../models/sessionModel');

const FilmSchema = new Schema({
    film_info: {
      filmName: {
        type: String,
        trim: true,
        required: true
      },
      description: {
        type: String,
        trim: true,
      },
      poster_path: {
        type: String,
        trim: true,
      },
      duration: {
        type: Number,
        required: true
      }
    },
    sessions: [{
      type: Schema.Types.ObjectId,
      ref: 'Session',
      required: true,
    }]  
  },
  {
    timestamps: true
  }
);

/* FilmSchema.pre('save', function(next){
  this.sessions = this.sessions.map(function(option) { return option._id; });
  next();
}); */

module.exports = mongoose.model('Film', FilmSchema);
























const propertySchema = new Schema(
  {
  name: {
  type: String,
  },
  address: {
  type: String,
  required: true,
  },
  nla: Number,
  image: String,
  class: String,
  state: {
  type: Schema.Types.ObjectId,
  ref: 'State',
  required: true,
  },
  market: {
  type: Schema.Types.ObjectId,
  ref: 'Market',
  required: true,
  },
  precinct: {
  type: Schema.Types.ObjectId,
  ref: 'Precinct',
  required: true,
  },
  grade: {
  type: Schema.Types.ObjectId,
  ref: 'Grade',
  required: true,
  },
  },
  {
  timestamps: true,
  versionKey: false,
  },
  );