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


router.get('/' , (req,res) => {

    const promise = Director.aggregate([
        {
            $lookup: {
            //director tablosu nereyle join edilecek
                from: 'movies',
            //director tablosundan hangi alanla eşleştireceksin
                localField: '_id',
            //movies koleksiyonunda hangi alanla eşleşecek
                foreignField: 'director_id',
            //nereye atayacak
                as: 'movies'
            }
        },
        {
            $unwind:{
                path: '$movies',
            //filmi olmayan yönetmenleri de listelemek için
                preserveNullAndEmptyArrays: true
            }
        },
        {
            //movies leri ayrı ayrı göstermesini
            //engellemek için gruplama yapmak
            //gerekiyor
            $group: {
                _id: {
                    _id: '$id',
                    name: '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies: {
                    $push: '$movies'
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                movies: '$movies'
            }
        }

    ]);

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

});









module.exports = router;
