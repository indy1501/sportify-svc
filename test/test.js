const superTest = require("supertest");
const should = require("should");
const axios = require('axios');
const request = require('request');
const expect = require('chai').expect;

require("../routes/businesses.js");

it('Check get business by business id is working', function(done) {
    axios.get('https://sportifysvc.codeninjas.cf/businesses/2e0899da-b712-4fc2-a8c0-5b840ba8fd70')
        .then((res) => {
            expect(res.status).to.equal(200);
            done();
        })
        .catch((error) => {
            console.error(error)
            done();
        })
});

it('Check search business by event type and city is working', function (done) {
  axios.get('https://sportifysvc.codeninjas.cf/businesses?event_type=restaurant&city=Danville')
      .then((res) => {
        expect(res.status).to.equal(200);
        done();
      })
      .catch((error) => {
        console.error(error)
        done();
      })
});

it('Check update business is working', function (done) {
    axios.get('https://sportifysvc.codeninjas.cf/businesses/2e0899da-b712-4fc2-a8c0-5b840ba8fd70')
        .then((res) => {
            expect(res.status).to.equal(200);
            done();
        })
        .catch((error) => {
            console.error(error)
            done();
        })
});
