const superTest = require("supertest");
const should = require("should");
const axios = require('axios');
const request = require('request');
const expect = require('chai').expect;
const nock = require('nock');
const response = require('./response');

require("../index.js");


it('Check the Statuscode for Get user Businesses api', function(done) {
  axios.get(`${process.env.API_endPointUrl}/users/test_11@gmail.com/businesses`)
  .then((res) => {
    expect(res.status).to.equal(200);
    done();
  })
  .catch((error) => {
    console.error(error)
    done();
  })
});


describe('Get User businesses', () => {

  beforeEach(() => {
    nock(`${process.env.API_endPointUrl}`)
      .get(`/users/test_user@gmail.com/businesses`)
      .reply(200, response);
  });
  
  it('Get business associated with user', function(done){

    axios.get(`${process.env.API_endPointUrl}/users/test_user@gmail.com/businesses`)
    .then((res) => {
      
        expect(response.name).to.equal('Test Business');
        expect(response.postal_code).to.equal('95045');
        expect(res.status).to.equal(200);
        done();
    })
    .catch((error) => {
        console.error(error)
        done();
    });
    });
});

it('Check the Statuscode for add new business api', function (done) {
  axios.post(`${process.env.API_endPointUrl}/users/test_11@gmail.com/businesses`, {
      "name": "Test Business",
      "categories": ["asian_food_4","restaurant_4"],
      "address": "1741 Gold Hill Rd, Ste 108",
      "city": "Temp",
      "state": "CA",
      "postal_code": "95045"
  })
    .then((res) => {
      expect(res.status).to.equal(200);
      done();
    })
    .catch((error) => {
      //console.error("test", error)
      done();
    })
});
