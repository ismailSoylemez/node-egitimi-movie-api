const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../../app');


chai.use(chaiHttp);

// testlerimizin ne testi olduğunu anlatıyoruz
// açıklama giriyoruz
// içerisinde birden fazla it() bulunabilir
// it() aslında unit testtir
describe('Node Server', () => {

    it('(GET /) anasayfayı döndürür' , (done) => {
        chai.request(server)
            .get('/')
            .end((err,res) => {
                res.should.have.status(200); //200 koduna sahip olmalı
                done();
            });


    });



});