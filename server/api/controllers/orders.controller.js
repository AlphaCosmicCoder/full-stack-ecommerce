const Order = require('../../database/models/Order');
const Cart = require('../../database/models/Cart');

const createOrder = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.userId }).populate('items.productId');
        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }

        const totalPrice = cart.items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);

        const order = new Order({
            userId: req.user.userId,
            items: cart.items,
            totalPrice,
        });

        await order.save();
        // Clear the cart
        cart.items = [];
        await cart.save();

        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.userId }).populate('items.productId');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

const getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('items.productId');
        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }
        res.json(order);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

module.exports = {
    createOrder,
    getOrder,
    getOrders
}