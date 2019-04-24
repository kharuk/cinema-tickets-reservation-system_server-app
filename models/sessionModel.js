const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sessionSeats = require('./sessionSeatModel');

const SessionSchema = new Schema({
  film: {
    type: Schema.Types.ObjectId,
    ref: 'Film',
    required: true,
  },
  cinema: {
    type: Schema.Types.ObjectId,
    ref: 'Cinema',
    required: true,
  },
  date: {
    type: Date,
    required: true
  },
  session_info: {
    seat_type: {
      type: Object,
      required: true
    },
    extra_services: {
      type: Object,
      required: true
    }
  }, 
  seatsAvailable: {
    type: Number,
    required: true
  }, 
  sessionSeats: [{
    type: Schema.Types.ObjectId,
    ref: 'SessionSeat',
    required: true,
  }]
},
  {
    timestamps: true
  }
);

SessionSchema.pre('remove', function(next) {
  console.log('remove');
  sessionSeats.deleteMany({ session_id: this._id }).exec();
  next();
});


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