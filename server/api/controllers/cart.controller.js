const Product = require('../../database/models/Product');
const Cart = require('../../database/models/Cart');

const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.userId }).populate('items.productId');
        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }
        res.json(cart);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ userId: req.user.userId });
        if (!cart) {
            cart = new Cart({ userId: req.user.userId, items: [] });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex > -1) {
            // Update quantity if item already exists
            cart.items[itemIndex].quantity += quantity;
        } else {
            // Add new item to cart
            cart.items.push({ productId, quantity });
        }

        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.userId });
        if (!cart) {
            return res.status(404).json({ msg: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item.productId.toString() === req.params.id);
        if (itemIndex > -1) {
            cart.items.splice(itemIndex, 1);
            await cart.save();
            return res.json(cart);
        }

        res.status(404).json({ msg: 'Item not found in cart' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

module.exports = {
    getCart,
    addToCart,
    removeFromCart
}