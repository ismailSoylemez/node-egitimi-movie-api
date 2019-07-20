const mongoose = require('mongoose');



module.exports = () => {
    mongoose.connect('mongodb://ismail:123456aA@ds353457.mlab.com:53457/heroku_l9gfth70',{useNewUrlParser: true});
    mongoose.connection.on('open' , () => {
        console.log('MongoDB: Connected');

    });
    mongoose.connection.on('error' , (err) => {
        console.log('MongoDB: Error',err);
    });

    //promise yapısı için tanımlandı
    mongoose.Promise = global.Promise;

};
