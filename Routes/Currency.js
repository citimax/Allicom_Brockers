
const express = require('express')
const Currency=express.Router();

var sql = require("mssql");
const config = require('../database')



Currency.get('/',(req, res) => {
    sql.connect(config, err => {
        new sql.Request()
        .input('UserID', sql.VarChar, 'steve@live.com')
        .input('Terminus', sql.VarChar, 'server')
        .execute('spSelectAllCurrencies', (err, result) => {
          if(err){
            res.json(err.message);
            
          }else{
           res.status(200).json(result.recordset);
          }
          sql.close();
        })
       
    });
  
}).post('/',(req,res)=>{
    sql.connect(config, err => {
        new sql.Request()
        .input('CurrCode', sql.VarChar, req.body.CurrCode)
        .input('CurrDesc', sql.VarChar, req.body.CurrDesc)
        .input('CurrPrec', sql.Int, 2)
        .input('UserID', sql.VarChar, 'steve@live.com')
        .input('Terminus', sql.VarChar, 'server')
        .execute('spSaveCurrencies', (err, result) => {
          if(err){
            res.json(err.message);
            
          }else{
           res.status(201).json(result.recordset);
          }
          sql.close();
        })
       
    });
})


module.exports = Currency;
