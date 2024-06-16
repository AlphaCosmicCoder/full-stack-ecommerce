const Product = require('../../database/models/Product');
const fileUpload = require('express-fileupload');
const fs = require('fs');

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'server error' })
    }
}

const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

const createProduct = async (req, res) => {
    const { name, description, price, category, stock } = req.body;

    try {
        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).json({ msg: 'Please upload a file.' });
        }

        // Construct new product object
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            stock,
            image: req.file.path // Store the path to the uploaded file in the database
        });

        // Save the new product to the database
        const savedProduct = await newProduct.save();

        res.status(201).json(savedProduct);
    } catch (err) {
        console.error('Error creating product:', err);
        res.status(500).json({ msg: 'Server error' });
    }
};

const updateProduct = async (req, res) => {
    const { name, description, price, category, stock } = req.body;
    console.log(req.body)
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, {
            name,
            description,
            price,
            category,
            stock,
            updatedAt: Date.now()
        }, { new: true });

        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        res.json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        await product.deleteOne();
        res.json({ msg: 'Product removed' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

module.exports = {
    getProduct,
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct
}