const { addToCart, getCart, removeFromCart } = require('../controllers/cart.controller');
const { auth } = require('../middleware/auth');

const cartRouter = require('express').Router();

// Cart
cartRouter.route('/').get(auth, getCart);
cartRouter.route('/').post(auth, addToCart);
cartRouter.route('/:id').delete(auth, removeFromCart);

module.exports = { cartRouter };