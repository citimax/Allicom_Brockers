// const express = require("express");
// const Auth = express.Router();
// var jwt = require("jsonwebtoken");

// function validateToken(req, res, next) {

//     var token =
//         req.body.token || req.query.token || req.headers["x-access-token"];
//     if (token) {


//         jwt.verify(token, "secret", function (err, decoded) {
//             if (err) {
//                 return res.json({
//                     success: false,
//                     message: "Failed to authenticate token."
//                 });
//             } else {

//                 if (1 == 3) {
//                     req.decoded = decoded;
//                     next();
//                 } else {
//                     return res.json({
//                         success: false,
//                         message: "No privilages."
//                     });
//                 }

//             }
//         });
//     } else {

//         return res.status(403).send({
//             success: false,
//             message: "No token provided."
//         });
//     }
// };

// function validaterole(options) {
//     return function (req, res, next) {
//         console.log(options.role)
//         console.log(options.action)
//         console.log(options.userName)
//         if (1 == 1) {
//             next();
//         } else {
//             console.log(options.userName)
//             return res.json({
//                 success: false,
//                 message: "No privilages."
//             });
//         }
//     }
// }



// module.exports = Auth;