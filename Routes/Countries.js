const express = require("express");
const Countries = express.Router();
var sql = require("mssql");
const config = require("../database");
const AppConstant = require("../AppConstant");
const Joi = require("joi");
Countries.get("/", (req, res) => {
     const pool = new sql.ConnectionPool(config);
     pool.connect(error => {
      new sql.Request(pool)
        .input("UserID", sql.VarChar, res.locals.user)
        .input("Terminus", sql.VarChar, req.ip[0])
        .execute("spSelectAllCountries", (err, result) => {
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
      CountryCode: Joi.string()
        .min(2)
        .max(50)
        .required(),
      CountryName: Joi.string()
        .min(3)
        .required()
    });

    const result = Joi.validate(req.body, schema);
    if (!result.error) {
      sql.connect(config, err => {
        new sql.Request()
          .input("CountryCode", sql.VarChar, req.body.CountryCode)
          .input("CountryName", sql.VarChar, req.body.CountryName)
          .input("Terminus", sql.VarChar, req.ip[0])
          .input("UserID", sql.VarChar, res.locals.user)
          .execute("spSaveCountries", (err, result) => {
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
  .delete("/:CountryCode", (req, res) => {
    const CountryCode = req.params.CountryCode;
    sql.connect(config, err => {
      new sql.Request()
        .input("CountryCode", sql.VarChar, CountryCode)
        .input("UserID", sql.VarChar, res.locals.user)
        .input("Terminus", sql.VarChar, req.ip[0])
        .execute("spDeleteCountries", (err, result) => {
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
  .get("/:CountryCode", (req, res) => {
    const CountryCode = req.params.CountryCode;
    sql.connect(config, err => {
      new sql.Request()
        .input("CountryCode", sql.VarChar, CountryCode)
        .input("UserID", sql.VarChar, res.locals.user)
        .input("Terminus", sql.VarChar, req.ip[0])
        .execute("spSelectCountries", (err, result) => {
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
  });

module.exports = Countries;