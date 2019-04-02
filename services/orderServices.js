//const User = require('../models/userModel');
const _ = require('lodash');
const Order = require('../models/orderModel');
//const films = require('../models/data.js');


function getAllOrders(req, res) {
  console.log('id',req.headers.id);
  Order.find({
    user_id: req.headers.id
  }).exec((err, result) => {
    if (!err) {
      res.json({result, isSuccessfully: true});
      return;
    } else {
      console.log(err);
      res.status(500).send(err)
    } 
  })
}

function createOrder(req, res) {
  console.log('body', req.body);
  Order.create(req.body, function (err, result) {
    if (!err) {
      res.json({result, isSuccessfully: true});
      return;
    } else {
      console.log(err);
        res.status(500).send(err)
    } 
  });

 /*  const data = req.body;
  newOrder.user_id = data.user_id;
  newOrder.date = data.date;
  newOrder.cinema = data.cinema;
  newOrder.filmName = data.filmName;
  newOrder.location = data.location;
  newOrder.chosenSeats = data.chosenSeats;
  newOrder.chosenExtraServices = data.chosenExtraServices;
  newOrder.price = data.price;
  const save =  newOrder.save(); */
}


module.exports = {
  getAllOrders,
  createOrder,
};