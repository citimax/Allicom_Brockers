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


app.use('/login', auth.router);
// app.use(auth.validateToken);
app.use("/users", auth.validaterole("Users"), UserRoute);
app.use("/company", auth.validaterole("company"), CompanyRoute);
app.use("/currency", auth.validaterole("currency"), currencyRoute);
app.use("/Countries", auth.validaterole("Countries"), Countries);
app.use("/Counties", auth.validaterole("Counties"), Counties);
app.use("/CostCenter", auth.validaterole("CostCenter"), CostCenter);
app.use("/CompanyCostCenterAccess", auth.validaterole("CompanyCostCenterAccess"), CompanyCostCenterAccess);
app.use("/Usergroups", auth.validaterole("Usergroups"), Usergroups);
app.use("/UserRoles", auth.validaterole("UserRoles"), UserRoles);
app.use('/roles', auth.validaterole("roles"), RolesRoute);
app.use('/securityGroups', auth.validaterole("securityGroups"), SecurityGroupsRoute);


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