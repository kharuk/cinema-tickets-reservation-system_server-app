const _ = require('lodash');
const Order = require('../models/orderModel');


function getAllOrders(req, res) {
  Order.find({
    user_id: req.user._id
  })
  .sort({date: 'desc'})
  .exec((err, result) => {
    if (!err) {
      res.json({orderList: result, isSuccessfully: true});
      return;
    } else {
      console.log(err);
      res.status(500).send(err)
    } 
  })
}

function createOrder(req, res) {
  Order.create(req.body, function (err, result) {
    if (!err) {
      res.json({result, isSuccessfully: true});
      return;
    } else {
      console.log(err);
        res.status(500).send(err)
    } 
  });
}


module.exports = {
  getAllOrders,
  createOrder,
};