const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  cinema: {
    type: String,
    trim: true,
    required: true
  },
  filmName: {
    type: String,
    trim: true,
    required: true
  },
  location: {
    type: String,
    trim: true,
    required: true
  },
  chosenSeats: {
    type: Array,
    required: true
  },
  chosenExtraServices: {
    type:  Object,
   // required: true
  },
  price: {
    type:  Object,
    required: true
  },
  created: { 
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', OrderSchema);