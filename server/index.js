const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const path = require('path')

const { authRouter } = require('./api/routes/auth.routes')
const { cartRouter } = require('./api/routes/cart.routes')
const { productRouter } = require('./api/routes/products.routes')
const { orderRouter } = require('./api/routes/orders.routes')

const app = express();
require('dotenv').config()

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDb Connection Established'))
    .catch(err => console.error(err));

const PORT = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.set(express.static(__dirname + '/public'))

app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter);

app.get('/upload/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'upload', filename);

    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(err.status || 500).send('Internal Server Error');
        } else {
            console.log('File sent successfully:', filename);
        }
    });
})

app.listen(PORT, () => {
    console.log(`Server is Listening on PORT : ${PORT}`)
})