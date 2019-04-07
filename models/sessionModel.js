const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
/*     cinema: {
      type: Schema.Types.ObjectId,
      ref: 'Cinema',
      required: true,
    },
 */   film: {
      type: Schema.Types.ObjectId,
      ref: 'Film',
      required: true,
 },/*
    date: {
      type: Date,
      required: true
    },
    sessionInfo: {
      seat_type: {
        type: Object,
        require: true
      },
      extra_services: {
        type: Object,
        require: true
      }
    }, */
    seatsAvailable: {
      type: Number,
      required: true
    }, 
  /*   sessionSeats: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Seat',
        //required: true,
      }
    ] */
  },
  {
    timestamps: true
  }
);


module.exports = mongoose.model('Session', SessionSchema);
























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