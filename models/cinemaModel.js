const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CinemaSchema = new Schema({
  cinemaName: {
    type: String,
    trim: true,
    required: true
  },
  location: {
    type: String,
    trim: true,
    required: true
  },
  seatsAvailable: {
    type: Number,
    required: true
  },
  seats: [{
    
  }] 
},
{
  timestamps
});


module.exports = mongoose.model('Cinema', CinemaSchema);