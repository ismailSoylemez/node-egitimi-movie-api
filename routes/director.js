const express = require('express');
const router = express.Router();

//MODELS
const Director = require('../models/Director');



router.post('/' , (req,res,next) => {

    // gelecek olan post datasıyla doldurulacak içi
    const director = new Director(req.body);
    const promise = director.save();

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });


});


module.exports = router;
