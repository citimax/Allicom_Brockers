
const express = require('express')
const User=express.Router();

var sql = require("mssql");
const config = require('../database')



User.get('/',(req, res) => {

    
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
    res.status(201).send("Posted");
})


module.exports = User;
