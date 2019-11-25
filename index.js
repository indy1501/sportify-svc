const express = require('express');
const cors = require('cors');
require('dotenv').config();

const businesses = require('./routes/businesses');
const users = require('./routes/users');
const app = express();
const bodyparser = require("body-parser");
const port = process.env.PORT || 8080;


app.use(cors())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use('/businesses', businesses);
app.use('/users', users);

app.get('/', function (req, res) {
    res.send('Hello World from Code Ninjas. Testing Continuous Deployment.')
})


app.listen(port, function () {
    console.log(' listening on port', port);
});

module.exports = app;
