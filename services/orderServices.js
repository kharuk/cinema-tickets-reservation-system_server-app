const _ = require('lodash');
const Order = require('../models/orderModel');


function getOrders(req, res) {
  const page = req.query.page ? +req.query.page : 1;
  const limit = 10;
  const dateQuerty = req.query.typeOfOrders === 'current' ? {$gte: new Date()} : {$lt: new Date()}

  Order.count({
    user_id: req.user._id,
    date: dateQuerty
  }, function(err, count) {
    if (!err) {
      Order.find({
        user_id: req.user._id,
        date: dateQuerty
      })
      .sort({date: 'desc'})
      .limit(limit)
      .skip(page*limit-limit)
      .exec((err, result) => {
        if (!err) {
          res.json({
            orderList: result, 
            pageSize: limit,
            totalAmount: count,
            pageNumber: page,
            isSuccessfully: true
          });
          return;
        } else {
          console.log(err);
          res.status(500).send(err)
        } 
      });
    } else {
      console.log(err);
      res.status(500).send(err)
    }
  });
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