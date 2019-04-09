const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SeatSchema = new Schema({
  chosen: {
    type: Boolean,
    required: true,
    default: false
  },
  booked: {
    type: Boolean,
    required: true,
    default: false
  },
  selectionDatetime: {
    type: Date,
    //default: new Date(),
   // required: true
  },
  seat_id: {
    type: Schema.Types.ObjectId,
    ref: 'Seat',
    required: true,
  }
},
{
  timestamps: true
});


module.exports = mongoose.model('SessionSeat', SeatSchema);