const express = require('express')
const app = express()
var bodyParser = require('body-parser');

const UserRoute= require('./Routes/user')
const CompanyRoute= require('./Routes/Company');
const currencyRoute = require('./Routes/Currency')

 app.use(bodyParser.urlencoded({extended:false}));
 app.use(bodyParser.json());

 app.locals.UserID = 'steve@live.com';
 app.locals.Terminus = 'Server';


app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

app.use('/users',UserRoute);
app.use('/company',CompanyRoute);
app.use('/currency',currencyRoute);


app.use((req,res,next)=>{
const error = new Error('resource not found');
error.status=404;
next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status ||500);
    res.json({
error:{
    message:error.message
}
    });
});

module.exports = app;