const express = require("express");
const Currency = express.Router();
var sql = require("mssql");
const config = require("../database");
const AppConstant = require("../AppConstant");
const Joi = require("joi");
const bcrypt = require("bcrypt");

Currency.get("/", (req, res) => {
    const pool = new sql.ConnectionPool(config);
    pool.connect(error => {
      new sql.Request(pool)
        .input("UserID", sql.VarChar, AppConstant.userName)
        .input("Terminus", sql.VarChar, AppConstant.Terminus)
        .execute("spSelectAllCurrencies", (err, result) => {
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
  .post("/", (req, res) => {
    const schema = Joi.object().keys({
      CurrCode: Joi.string()
        .min(3)
        .max(50)
        .required(),
      CurrDesc: Joi.string()
        .min(3)
        .max(50)
        .required()
    });

    const result = Joi.validate(req.body, schema);
    if (!result.error) {
      sql.connect(config, err => {
        new sql.Request()
          .input("CurrCode", sql.VarChar, req.body.CurrCode)
          .input("CurrDesc", sql.VarChar, req.body.CurrDesc)
          .input("CurrPrec", sql.Int, 2)
          .input("UserID", sql.VarChar, AppConstant.userName)
          .input("Terminus", sql.VarChar, AppConstant.Terminus)

          .execute("spSaveCurrencies", (err, result) => {
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
    } else {
      res.json({
        success: false,
        message: result.error.details[0].message
      });
    }
  })
  .delete("/:CurrCode", (req, res) => {
    const CurrCode = req.params.CurrCode;
    sql.connect(config, err => {
      new sql.Request()
        .input("CurrCode", sql.VarChar, CurrCode)
        .input("UserID", sql.VarChar, AppConstant.userName)
        .input("Terminus", sql.VarChar, AppConstant.Terminus)
        .execute("spDeleteCurrencies", (err, result) => {
          if (err) {
            res.json({
              success: false,
              message: err.originalError.message
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
  .get("/:CurrCode", (req, res) => {
    const CurrCode = req.params.CurrCode;
    sql.connect(config, err => {
      new sql.Request()
        .input("CurrCode", sql.VarChar, CurrCode)
        .input("UserID", sql.VarChar, AppConstant.userName)
        .input("Terminus", sql.VarChar, AppConstant.Terminus)
        .execute("spSelectCurrencies", (err, result) => {
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
  });

module.exports = Currency;