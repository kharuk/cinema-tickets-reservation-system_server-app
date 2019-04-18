const _ = require('lodash');
const Order = require('../models/orderModel');


function getOrders(req, res) {
  const page = req.params.page ? req.params.page : 1;
  const limit = 10;
  console.log(req.params);
  const dateQuerty = req.params.typeOfOrders === 'current' ? {$gte: new Date()} : {$lt: new Date()}
  console.log('dateQuerty', dateQuerty);
  Order.find({
    user_id: req.user._id,
    date: dateQuerty
  })
  .sort({date: 'desc'})
  .limit(limit)
  .skip(page*limit-limit)
  .exec((err, result) => {
    if (!err) {
      console.log(result);
      res.json({orderList: result, isSuccessfully: true});
      return;
    } else {
      console.log(err);
      res.status(500).send(err)
    } 
  })
}

function createOrder(req, res) {
  req.body.user_id = req.user._id;
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
  getOrders,
  createOrder,
};