const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//models
const User = require('../models/User');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});


// username ve password kaydı
// passwordu hasledik
router.post('/register', (req, res, next) => {

  const {username,password} = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    // Store hash in your password DB.

    const user = new User({
      username,
      password: hash
    });

    const promise = user.save();

    promise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    });


  });



  });


router.post('/authenticate' , (req,res) => {
  const {username , password} = req.body;

  // girilen username database de var mı kontrolü yapılıyor
  User.findOne({
        username
      }, (err,user) => {
        if(err)
          throw err;

        if(!user){ //kullanıcı yoksa
          res.json({
            status: false,
            message: 'Authentication failed , user not found'
          });
        }else{
          //kullanıcı varsa elimdeki şifre ile
          //veritabanı şifresini karşılaştıracağım
          bcrypt.compare(password , user.password).then((result) => {
            if(!result){ //şifre yanlışsa
              res.json({
                status: false,
                message: 'Authentication failed , wrong password'
              });
            }else{ // şifre doğruysa
              //payload oluştur
              const payload = {
                username
              };
              //token oluştur
              const token = jwt.sign(payload, req.app.get('api_secret_key'), {
                expiresIn: 720 //12 saat
              });

              res.json({
                status: true,
                token
              })

            }
          });
        }

      });




});

module.exports = router;
