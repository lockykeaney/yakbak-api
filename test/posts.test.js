let mongoose = require("mongoose");
let Post = require('../models/post');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Posts', () => {
  beforeEach((done) => {
    Post.remove({}, (err) => {
      done();
    });
  });

  describe('/GET posts', () => {
    it('it should GET all the posts', (done) => {
      chai.request(app)
        .get('/posts')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
        done();
      });
    });
  });

  describe('/POST post', () => {
    it('it should not POST a post without content', (done) => {
      let post = {
        content: "This is a test post"
      }
      chai.request(app)
        .post('/posts/new')
        .send(post)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            // res.body.should.eq(post);
          done();
        });
      });
    });

});
