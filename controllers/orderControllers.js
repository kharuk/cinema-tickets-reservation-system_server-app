const orderServices = require('../services/orderServices');

function getAllOrders(req, res) {
  orderServices.getAllOrders(req, res); 
}

function createOrder(req, res) {
  orderServices.createOrder(req, res);  
}


module.exports = {
  getAllOrders,
  createOrder
};