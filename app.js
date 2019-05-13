const express = require("express");
const app = express();
var bodyParser = require("body-parser");

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
const Clients = require('./Routes/Underwriting/ClientsInfo')
const vehicleMake = require('./Routes/Underwriting/VehicleMake')
const auth = require('./auth');
const PaymentModes = require("./Routes/Underwriting/PaymentModes");
const PolicyCategories = require("./Routes/Underwriting/PolicyCategories");
const PolicyClasses = require("./Routes/Underwriting/PolicyClasses");



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

app.use("/api/login", auth.router);
app.use(auth.validateToken);
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
app.use('/api/clients', auth.validaterole("securityGroups"), Clients);
app.use('/api/vehiclemake', auth.validaterole("securityGroups"), vehicleMake);


app.use("/api/roles", auth.validaterole("roles"), RolesRoute);
app.use(
  "/api/securityGroups",
  auth.validaterole("securityGroups"),
  SecurityGroupsRoute
);
app.use("/api/PaymentModes", auth.validaterole("roles"), PaymentModes);
app.use("/api/PolicyCategories", auth.validaterole("roles"), PolicyCategories);
app.use("/api/PolicyClasses", auth.validaterole("roles"), PolicyClasses);

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