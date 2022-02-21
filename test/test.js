
let chai = require('chai');

let chaiHttp = require('chai-http');
let server = require('../index');
chai.use(chaiHttp);

//Assertion style
chai.should();


describe('TaskApi', () => {

    describe('POST/auth', () => {
        it("it should POST all the login data", (done) => {
            chai.request(server)
                .get('/auth')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('email');
                    response.body.should.have.property('password');
                    done();
                })
        })
        it("it should not POST all the login data", (done) => {
            chai.request(server)
                .get('/auth')
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                })
        })
    })


    describe('POST/addresses', () => {
        it("it should POST all the address data", (done) => {
            chai.request(server)
                .get('/addresses')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('name');
                    response.body.should.have.property('contactNumber');
                    response.body.should.have.property('zipCode');

                    done();
                })
        })
        it("it should not POST all the address data", (done) => {
            chai.request(server)
                .get('/addresses')
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                })
        })
    })


    describe('POST/products/:id', () => {
        it("it should get all the products  data by Id", (done) => {
            const taskId=1;
            chai.request(server)
                .get('products'+taskId)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('name');
                    response.body.should.have.property('availableItems');
                    response.body.should.have.property('price');
                    done();
                })
        })
        it("it should not get all the products data by Id", (done) => {
            const taskId = 2;
            chai.request(server)
                .get('products'+taskId)
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                })
        })
    })

})