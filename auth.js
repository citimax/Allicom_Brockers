var jwt = require("jsonwebtoken");
const user = { id: 1, password: "123" };

function validateToken(req, res, next) {
  // check header or url parameters or post parameters for token
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  // decode token
  if (token) {
    // verifies secret and checks exp

    jwt.verify(token, "secret", function(err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: "Failed to authenticate token."
        });
      } else {
        // here we validate access privilages
        // if(1==3){
        //   req.decoded = decoded;
        next();
        // }else{
        //   return res.json({
        //     success: false,
        //     message: "No privilages."
        //   });
        // }
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: "No token provided."
    });
  }
}

function validaterole(options) {
  return function(req, res, next) {
    // Implement the middleware function based on the options object
    console.log(options.role);
    console.log(options.action);
    console.log(options.userName);
    if (1 == 1) {
      next();
    } else {
      console.log(options.userName);
      return res.json({
        success: false,
        message: "No privilages."
      });
    }
  };
}

module.exports = { validateToken, validaterole };
