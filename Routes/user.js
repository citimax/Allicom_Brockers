const express = require("express");
const User = express.Router();
var sql = require("mssql");
const config = require("../database");
const AppConstant = require("../AppConstant");
const Joi = require("joi");
const bcrypt = require("bcrypt");
<<<<<<< HEAD

User.get("/", (req, res) => {
    sql.connect(config, err => {
      new sql.Request()
        .input("UserID", sql.VarChar, AppConstant.userName)
        .input("Terminus", sql.VarChar, AppConstant.Terminus)
        .execute("spSelectAllUsers", (err, result) => {
          if (err) {
            res.json({
              success: false,
              message: err.message
            });
          } else {
            res.status(200).json(result.recordset);
          }
          sql.close();
        });
    });
  })
=======
var jwt = require("jsonwebtoken");



User.get(
    "/", (req, res) => {
      sql.connect(config, err => {
        new sql.Request()
          .input("UserID", sql.VarChar, AppConstant.userName)
          .input("Terminus", sql.VarChar, AppConstant.Terminus)
          .execute("spSelectAllUsers", (err, result) => {
            if (err) {
              res.json({
                success: false,
                message: err.message
              });
            } else {
              res.status(200).json(result.recordset);
            }
            sql.close();
          });
      });
    })
>>>>>>> b980b914b99e3221430877761657814d5873fa59
  .post("/", (req, res) => {
    const schema = Joi.object().keys({
      UserName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
      FullNames: Joi.string()
        .min(3)
        .required(),
      Password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
      ConfirmPassword: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .equal(req.body.Password),
      Telephone: Joi.number()
        .integer()
        .required(),
      ExpiryDate: Joi.date().required(),
      IsActive: Joi.bool().required(),
      Email: Joi.string().email({
        minDomainAtoms: 2
      })
    });

    const result = Joi.validate(req.body, schema);
    if (!result.error) {
      bcrypt.hash(req.body.Password, 10, function (err, hash) {
        if (err) {
          return res.json({
            success: false,
            message: "failed to bcyrpt the password"
          });
        } else {
          sql.connect(config, err => {
            new sql.Request()
              .input("UserName", sql.VarChar, req.body.UserName)
              .input("FullNames", sql.VarChar, req.body.FullNames)
              .input("Password", sql.VarChar, hash)
              .input("ConfirmPassword", sql.VarChar, hash)
              .input("Email", sql.VarChar, req.body.Email)
              .input("Telephone", sql.VarChar, req.body.Telephone)
              .input("ExpiryDate", sql.Date, req.body.ExpiryDate)
              .input("IsActive", sql.Bit, req.body.IsActive)
              .input("UserID", sql.VarChar, AppConstant.userName)
              .input("Terminus", sql.VarChar, AppConstant.Terminus)
              .execute("spSaveUsers", (err, result) => {
                if (err) {
                  res.json({
                    success: false,
                    message: err.message
                  });
                } else {
                  res.json({
                    success: true,
                    message: "saved"
                  });
                }
                sql.close();
              });
          });
        }
      });
    } else {
      res.json({
        success: false,
        message: result.error.details[0].message
      });
    }
  })
  .delete("/:username", (req, res) => {
    const username = req.params.username;
    sql.connect(config, err => {
      new sql.Request()
        .input("UserName", sql.VarChar, username)
        .input("Terminus", sql.VarChar, AppConstant.Terminus)
        .execute("spDeleteUsers", (err, result) => {
          if (err) {
            res.json({
              success: false,
              message: err.message
            });
          } else {
            res.json({
              success: true,
              message: "deleted"
            });
          }
          sql.close();
        });
    });
  })
  .get("/:username", (req, res) => {
    const username = req.params.username;
    sql.connect(config, err => {
      new sql.Request()
        .input("UserName", sql.VarChar, username)
        .input("Terminus", sql.VarChar, AppConstant.Terminus)
        .execute("spSelectUsers", (err, result) => {
          if (err) {
            res.json({
              success: false,
              message: err.message
            });
          } else {
            res.status(200).send(result.recordset);
          }
          sql.close();
        });
    });
  })
  .get('/:UserName/:securitymodule', (req, res) => {
<<<<<<< HEAD
=======
    const right = "View";
>>>>>>> b980b914b99e3221430877761657814d5873fa59
    sql.connect(config, err => {
      new sql.Request()
        .input("UserName", sql.VarChar, req.params.UserName)
        .input("SecurityModule", sql.VarChar, req.params.securitymodule)
        .input("UserID", sql.VarChar, AppConstant.userName)
        .input("Terminus", sql.VarChar, AppConstant.Terminus)
        .execute("sp_ValidatePrivilege", (err, result) => {
          if (err) {
            res.json({
              success: false,
              message: err.message
            });
          } else {
<<<<<<< HEAD
            res.status(200).json(result.recordset);
=======
            if (result.recordset[0] + right) {
              res.send('true.....');
            }


>>>>>>> b980b914b99e3221430877761657814d5873fa59
          }
          sql.close();
        });
    });
  });

<<<<<<< HEAD
  
=======

>>>>>>> b980b914b99e3221430877761657814d5873fa59

module.exports = User;