const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Product = require('./models/products');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());
mongoose.connect("mongodb+srv://Charith:K7ulBusW5xqve3y0@cluster0-ow00d.mongodb.net/BudgetDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('connection Successful');
    }).catch(() => {
    console.log('connection failed');
});

app.use((req, res, next) => {
    console.log('this is working');
    next();
});

app.get('/products', (req, res, next) => {
    const product = [{
        id: '100d',
        name: 'name1',
        price: 20000,
        imagePath: '/assets/image-assets/headphone.jpg',
        category: 'electronics',
        condition: 'new'
    },
        {
            id: '100d',
            name: 'name1',
            price: 20000,
            imagePath: '/assets/image-assets/headphone.jpg',
            category: 'electronics',
            condition: 'new'
        },
        {
            id: '100d',
            name: 'name1',
            price: 20000,
            imagePath: '/assets/image-assets/headphone.jpg',
            category: 'electronics',
            condition: 'new'
        },
        {
            id: '100d',
            name: 'name1',
            price: 20000,
            imagePath: '/assets/image-assets/headphone.jpg',
            category: 'electronics',
            condition: 'new'
        },
    ];

    res.status(200).json({
        message: 'success',
        products: product
    });
});

app.post('/products', (req, res, next) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        condition: req.body.condition
    });
    product.save().then(() => {
        res.status(200).json({
            message: 'success'
        })
    }).catch(() => {
        res.status(500).json({
            message: 'failed'
        })
    });
});

module.exports = app;
