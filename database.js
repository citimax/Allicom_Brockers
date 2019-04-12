
const sql = require('mssql');

const config = {
    user: 'guest',
    password: 'Citimax123',
    server: 'Citimax', // You can use 'localhost\\instance' to connect to named instance
    database: 'DB',
 
    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}
module.exports=config;
