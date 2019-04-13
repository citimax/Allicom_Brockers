
const express = require('express')
const User=express.Router();
const auth=require('../auth')
var sql = require("mssql");
const config = require('../database')


User.use(auth.validateToken);

User.get('/',auth.validaterole({ role: 'users', userName: 'super@live.com',action:'view' }),(req, res) => {    
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
