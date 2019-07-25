const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../../app');
chai.use(chaiHttp);


let token , movie_id;

//tüm filmleri listeleyen servisin testi olacak
//fakat öncelikle token olması lazım

describe('/api/Movies Tests', () => {

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

    describe('/POST movie' , () => {

        const movie = {
            title: 'udemy',
            director_id: '5d34f32e4dead63ac0242e3b',
            category: 'Komedi',
            country: 'Türkiye',
            year: 1950,
            imdb_score: 8
        };


        it('it should POST a movie' , (done) => {
            chai.request(server)
                .post('/api/movies')
                .send(movie)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_score');
                    movie_id = res.body._id;
                    done();
                });
        });
    });

    describe('/GET/:movie_id movie' , () => {

        it('it should GET a movie by the given id.', (done) => {
            chai.request(server)
                .get('/api/movies/'+movie_id)
                .set('x-access-token',token)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_score');
                    res.body.should.have.property('_id').eql(movie_id);
                    done();
                });
        });
    });

    describe('/PUT/:movie_id movie', () => {
        it('it should UPDATE a movie given by id', (done) => {
            const movie = {
                title: '93creative',
                director_id: '5a34e1afb8523a78631f8541',
                category: 'Suç',
                country: 'Fransa',
                year: 1970,
                imdb_score: 9
            };

            chai.request(server)
                .put('/api/movies/' + movie_id)
                .send(movie)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title').eql(movie.title);
                    res.body.should.have.property('director_id').eql(movie.director_id);
                    res.body.should.have.property('category').eql(movie.category);
                    res.body.should.have.property('country').eql(movie.country);
                    res.body.should.have.property('year').eql(movie.year);
                    res.body.should.have.property('imdb_score').eql(movie.imdb_score);

                    done();
                });
        });
    });

    describe('/DELETE/:movie_id movie', () => {
        it('it should DELETE a movie given by id', (done) => {


            chai.request(server)
                .delete('/api/movies/' + movie_id)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(1);
                    done();
                });
        });
    });




});
