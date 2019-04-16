const express = require('express')
const app = express()
var bodyParser = require('body-parser');
<<<<<<< HEAD

const UserRoute= require('./Routes/user')
const CompanyRoute= require('./Routes/Company');
const currencyRoute = require('./Routes/Currency')
=======
var jwt = require("jsonwebtoken");
//routes
const UserRoute= require('./Setups/user')
const CompanyRoute= require('./Setups/Companies')
>>>>>>> master



//end of routes
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

//load routes
const user = { id: 1, password: "123" };

app.post("/authenticate", function(req, res) {
        if (user.password != req.body.password) {
        res.json({
          success: false,
          message: "Authentication failed. Wrong password."
        });
      } else {       
        var token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            data: "foobar"
          },
          "secret"
        );
          res.json({
          success: true,
          message: "Enjoy your token!",
          token: token
        });
      }
    
  });

app.use('/users',UserRoute);
app.use('/company',CompanyRoute);
app.use('/currency',currencyRoute);

//end of app use routes
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