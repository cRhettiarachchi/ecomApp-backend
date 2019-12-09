const express = require('express');
const bCrypt = require('bcryptjs');
const User = require('../models/user');
const router = express.Router();

router.post('/sign-up', (req, res, next) => {
    bCrypt.hash(req.body.password)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash,
                date: req.body.date,
                name: req.body.name,
                gender: req.body.gender
            });
            user.save().then(result => {
                console.log(result);
            }).catch(err => {
                console.log(err);
            })
        });
});

module.exports = router;
