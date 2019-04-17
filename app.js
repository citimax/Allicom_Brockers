const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");
const UserRoute = require("./Routes/user");
const CompanyRoute = require("./Routes/Company");
const currencyRoute = require("./Routes/Currency");
const Countries = require("./Routes/Countries");
const Counties = require("./Routes/Counties");
const CostCenter = require("./Routes/CostCenter");
const CompanyCostCenterAccess = require("./Routes/CompanyCostCenterAccess");
const Usergroups = require("./Routes/UserGroups");
const UserRoles = require("./Routes/UserRoles");

const RolesRoute = require("./Routes/Roles");
const SecurityGroupsRoute = require("./Routes/SecurityGroups");

//end of routes
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.use(function(req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization"
  );
  next();
});

//load routes
const user = {
  id: 1,
  password: "123"
};

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

app.use("/users", UserRoute);
app.use("/company", CompanyRoute);
app.use("/currency", currencyRoute);
app.use("/Countries", Countries);
app.use("/Counties", Counties);
app.use("/CostCenter", CostCenter);
app.use("/CompanyCostCenterAccess", CompanyCostCenterAccess);
app.use("/Usergroups", Usergroups);
app.use("/UserRoles", UserRoles);
//end of app use routes

//end of routes
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.use(function(req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization"
  );
  next();
});

app.use("/users", UserRoute);
app.use("/company", CompanyRoute);
app.use("/currency", currencyRoute);
app.use("/roles", RolesRoute);
app.use("/securityGroups", SecurityGroupsRoute);
app.use("/security", SecurityGroupsRoute);

//end of app use routes
app.use((req, res, next) => {
  const error = new Error("resource not found");
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
