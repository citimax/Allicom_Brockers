<<<<<<< HEAD
const express = require('express')
const app = express()
var bodyParser = require('body-parser');

const UserRoute = require('./Routes/user')
const CompanyRoute = require('./Routes/Company');
const currencyRoute = require('./Routes/Currency');
const RolesRoute = require('./Routes/Roles');
const SecurityGroupsRoute = require('./Routes/SecurityGroups');



//end of routes
=======
const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
const request = require("request");
const UserRoute = require("./Routes/user");
const CompanyRoute = require("./Routes/Company");
const currencyRoute = require("./Routes/Currency");
const Countries = require("./Routes/Countries");
const Counties = require("./Routes/Counties");
const CostCenter = require("./Routes/CostCenter");
const CompanyCostCenterAccess = require("./Routes/CompanyCostCenterAccess");
const Usergroups = require("./Routes/UserGroups");
const UserRoles = require("./Routes/UserRoles");
const RolesRoute = require('./Routes/Roles');
const SecurityGroupsRoute = require('./Routes/SecurityGroups');
const auth = require('./auth');



app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization"
  );
  next();
});


app.use('/api/login', auth.router);
// app.use(auth.validateToken);
app.use("/api/users", auth.validaterole("Users"), UserRoute);
app.use("/api/company", auth.validaterole("company"), CompanyRoute);
app.use("/api/currency", auth.validaterole("currency"), currencyRoute);
app.use("/api/Countries", auth.validaterole("Countries"), Countries);
app.use("/api/Counties", auth.validaterole("Counties"), Counties);
app.use("/api/CostCenter", auth.validaterole("CostCenter"), CostCenter);
app.use("/api/CompanyCostCenterAccess", auth.validaterole("CompanyCostCenterAccess"), CompanyCostCenterAccess);
app.use("/api/Usergroups", auth.validaterole("Usergroups"), Usergroups);
app.use("/api/UserRoles", auth.validaterole("UserRoles"), UserRoles);
app.use('/api/roles', auth.validaterole("roles"), RolesRoute);
app.use('/api/securityGroups', auth.validaterole("securityGroups"), SecurityGroupsRoute);


>>>>>>> b980b914b99e3221430877761657814d5873fa59
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());




app.use(function (req, res, next) {
  //Enabling CORS 
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
  next();
});

<<<<<<< HEAD
app.use('/users', UserRoute);
app.use('/company', CompanyRoute);
app.use('/currency', currencyRoute);
app.use('/roles', RolesRoute);
app.use('/securityGroups', SecurityGroupsRoute);
=======

>>>>>>> b980b914b99e3221430877761657814d5873fa59

//end of app use routes
app.use((req, res, next) => {
  const error = new Error('resource not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;