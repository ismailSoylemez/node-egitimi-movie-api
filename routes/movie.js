const express = require('express');
const router = express.Router();

//Models
const Movie = require('../models/Movie');


router.post('/', (req, res, next) => {


  //req in body
  //const { title,imdb_score,category,country,year } = req.body;

  //res.send(title);

  //yukarıdaki bilgileri veri tabanına kaydetmek
  /*const movie = new Movie({
      title: title,
      imdb_score: imdb_score,
      category: category,
      country: country,
      year: year
  });*/

  //body deki tüm değerleri direkt oluşturur
  const movie = new Movie(req.body);

  /*
  movie.save((err,data) => {
    if (err)
      res.json(err);

    res.json({status: 1});
  });*/


  //yukarıdakiyle aynı fakat daha temiz kod
  const promise = movie.save();

  promise.then((data) => {
    res.json({status: 1});
  }).catch((err) => {
    res.json(err);
  });



});



module.exports = router;
