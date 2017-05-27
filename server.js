var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var app = express();

var cUser = require('./controllers/user');

var seed = require('./seeddata');

var checkAuthenticated = require('./services/checkAuthenticated');
var cors = require('./services/cors');

//seed.seedData();

//Middlewares
app.use(bodyParser.json()); //bodyParser for JSON POSTs
app.use(cors); //custom middleware for CORS

//REQUESTS

//User
app.post('/user/register', cUser.register);
app.post('/user/login', cUser.login);

app.post('/user/createreq', checkAuthenticated, cUser.createRequest);

app.get('/user/getreqs', checkAuthenticated, cUser.getLoginRequests);
app.get('/user/getreq/:id', checkAuthenticated, cUser.getRequest);
app.get('/user/getres/:id', checkAuthenticated, cUser.getResponse);
app.get('/user/getresdet/:id', checkAuthenticated, cUser.getResponseDetail);

app.get('/user/getlogin', checkAuthenticated, cUser.getLogin);

//Connection
mongoose.connect("mongodb://localhost:27017/rpa1db", function(err, db){
    if (!err) {
        console.log("we are connected to RPA1 mongo database");
    }
});

var server = app.listen(5100, function(){
    console.log('listening on port ', server.address().port);
});
