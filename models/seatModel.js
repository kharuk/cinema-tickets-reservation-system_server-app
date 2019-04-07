const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SeatSchema = new Schema({
  row: {
    type: Number,
    required: true
  },
  column: {
    type: Number,
    required: true
  },
  chosen: {
    type: Boolean,
    required: true
  },
  booked: {
    type: Boolean,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  selectionDatetime: {
    type: Data,
    //default: new Data(),
   // required: true
  }
},
{
  timestamps
});


module.exports = mongoose.model('Seat', SeatSchema);