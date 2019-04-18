const orderServices = require('../services/orderServices');

function getOrders(req, res) {
  orderServices.getOrders(req, res); 
}

function createOrder(req, res) {
  orderServices.createOrder(req, res);  
}


module.exports = {
  getOrders,
  createOrder
};