const express = require('express');
var app = express();
var http = require ('http');
var cors = require('cors');
const user = require('./route/userRouter.js')
const device = require('./route/deviceRouter')
const admin = require('./route/adminRouter')


var mongoose = require('mongoose')
var mongoDB = 'mongodb://127.0.0.1/vizmerlad_database';
mongoose.connect(mongoDB, {useNewUrlParser: true , useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
var httpServer = http.createServer(app);

var bodyparser = require('body-parser');

app.use(cors())

app.use(bodyparser.json());
app.set('secretKey', 'viz987')

app.get("/", function (req, res) {
    res.json({"test": "Welcome to vizmerlad.com"})
});
app.use('/user', user)
app.use('/device', device)
app.use('/admin', admin)

//app.use('/device', device)
app.use(function (req, res, next) {
    var err = new Error('Not Found')
    err.status = 404;
    
    next(err)
});
app.use(function (err, req, res, next) {
    console.log(err)
    if (err.status === 404) {
        res.status(404).json({message: "not found"})
        next(err)
    } else {
        res.status(500).json({message: "Server crashed"})
    }
})


httpServer.listen(8000, '192.168.43.205' , function () {
    console.log("My server is working well ");
});



