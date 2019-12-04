const express = require('express');
const cors = require('cors');
require('dotenv').config({path:'/home/ubuntu/.env'});

const businesses = require('./routes/sportify/businesses');
const users = require('./routes/sportify/users');
const app = express();
const bodyparser = require("body-parser");
const port = process.env.PORT || 8080;


app.use(cors())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use('/sportify/businesses', businesses);
app.use('/sportify/users', users);

app.get('/', function (req, res) {
    res.send('Hello World from Code Ninjas.')
})


app.listen(port, function () {
    console.log(' listening on port', port);
});

module.exports = app;
