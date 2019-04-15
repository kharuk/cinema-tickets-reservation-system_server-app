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
/*   chosen: {
    type: Boolean,
    required: true,
    default: false
  },
  booked: {
    type: Boolean,
    required: true,
    default: false
  }, */
  type: {
    type: String,
    required: true
  },
/*   selectionDatetime: {
    type: Date,
    //default: new Date(),
   // required: true
  }, */
  cinema_id: {
    type: Schema.Types.ObjectId,
    ref: 'Cinema',
    required: true,
  }
},
{
  timestamps: true
});


module.exports = mongoose.model('Seat', SeatSchema);