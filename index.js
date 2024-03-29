const express = require('express');
const cors = require('cors');
require('dotenv').config({path:'/home/ubuntu/.env'});

const businesses = require('./routes/businesses');
const users = require('./routes/users');
const app = express();
const bodyparser = require("body-parser");
const port = process.env.PORT || 3001;


app.use(cors())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use('/businesses', businesses);
app.use('/users', users);

app.get('/', function (req, res) {
    res.send('Sportify SVC Backend')
})


app.listen(port, function () {
    console.log('codeninjas listening on port', port);
});

module.exports = app;
