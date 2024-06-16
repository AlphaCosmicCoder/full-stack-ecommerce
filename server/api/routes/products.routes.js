const { createProduct, deleteProduct, getProduct, getProducts, updateProduct } = require('../controllers/products.controller');
const { admin } = require('../middleware/admin');
const { auth } = require('../middleware/auth');
const { upload } = require('../middleware/multerConnfig');

const productRouter = require('express').Router();


// product Management
productRouter.route('/').get(getProducts)
productRouter.route('/:id').get(getProduct)
// admin only
productRouter.route('/').post(auth, admin, upload.single("image"), createProduct)
productRouter.route('/:id').put(auth, admin, updateProduct)
productRouter.route('/:id').delete(auth, admin, deleteProduct)


module.exports = { productRouter }

