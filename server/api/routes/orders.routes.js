const orderRouter = require('express').Router();
const { createOrder, getOrders, getOrder } = require('../controllers/orders.controller');
const { auth } = require('../middleware/auth');

orderRouter.route('/').post(auth, createOrder);
orderRouter.route('/').get(auth, getOrders);
orderRouter.route('/:id').get(auth, getOrder);


module.exports = { orderRouter };