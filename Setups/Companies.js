
const express = require('express')
const Company=express.Router();

Company.get('/',(req, res) => res.send('Hello company!'))


module.exports = Company;