const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../../app');
chai.use(chaiHttp);



let token;

//tüm filmleri listeleyen servisin testi olacak
//fakat öncelikle token olması lazım

describe('/api/movies tests', () => {


    //tokenı alabilmek için testler başlamadan önce almamız gerekli
    // teste başlamadan önce işlem yapabilmek için
    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({username:'ismail' , password: '12345'})
            .end((err,res) => {
                token = res.body.token;
                //console.log(token);
                done();
            });
    });




    describe('/GET movies' , () => {
       it('it should GET all the movies', (done) => {
           //tüm filmleri listeleyen yere istek yapmalıyım
           //tokeni de header olarak yazmalıyım

           chai.request(server)
               .get('/api/movies')
               .set('x-access-token', token)
               .end((err,res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array'); // bir array olmalı
                   done();
               });
       })
    });




});
