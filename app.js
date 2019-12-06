const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');
const Product = require('./models/products');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("invalid file type");
        if ( isValid) {
            error = null;
        }
        cb(error, "images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});
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
    Product.find().then( result => {
        res.status(200).json({
            products: result
        });
    });
});

app.post('/products', multer({storage: storage}).single('image'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        condition: req.body.condition,
        imagePath: url + '/images/' + req.file.filename
    });
    console.log(product);
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
