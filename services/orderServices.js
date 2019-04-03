const _ = require('lodash');
const Order = require('../models/orderModel');


function getAllOrders(req, res) {
  console.log('id',req.headers.id);
  Order.find({
    user_id: req.headers.id
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
}


module.exports = {
  getAllOrders,
  createOrder,
};