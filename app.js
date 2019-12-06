const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const productsRouter = require('./routes/products');

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

app.use('/images', express.static(path.join('images')));

app.use('/products', productsRouter);

module.exports = app;
