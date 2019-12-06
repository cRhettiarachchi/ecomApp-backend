const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
mongoose.connect("mongodb+srv://Charith:K7ulBusW5xqve3y0@cluster0-ow00d.mongodb.net/BudgetDB", {useNewUrlParser: true,  useUnifiedTopology: true})
    .then(() => {
        console.log('connected successful');
    }).catch(() => {
    console.log('connection failed');
});

app.use((req, res, next) => {
    console.log('this is working');
    res.send('hello from express');
});

module.exports = app;
