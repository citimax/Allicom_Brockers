const express = require("express");
const Company = express.Router();
var sql = require("mssql");
const config = require("../database");
const AppConstant = require("../AppConstant");
const Joi = require("joi");


Company.get("/", (req, res) => {
    sql.connect(config, err => {
      new sql.Request()
        .input("UserID", sql.VarChar, res.locals.user)
        .input("Terminus", sql.VarChar, req.ip[0])
        .execute("spSelectAllCompanies", (err, result) => {
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
      CompCode: Joi.string()
        .min(1)
        .max(50)
        .required(),
      CompName: Joi.string()
        .min(3)
        .max(50)
        .required(),
      Telephone: Joi.string()
        .max(50)
        .required(),
      Fax: Joi.string()
        .max(50)
        .required(),
      Email: Joi.string()
        .max(50)
        .required(),
      Website: Joi.string()
        .max(50)
        .required(),
      PostalAddress: Joi.string()
        .max(50)
        .required(),
      Street: Joi.string()
        .max(50)
        .required(),
      Country: Joi.string()
        .max(50)
        .required(),
      County: Joi.string()
        .max(50)
        .required(),
      PINNo: Joi.string()
        .max(50)
        .required(),
      NHIFNo: Joi.string()
        .max(50)
        .required(),
      NSSFNo: Joi.string()
        .max(50)
        .required(),
      BaseCurr: Joi.string()
        .min(3)
        .max(50)
        .required()
    });

    const result = Joi.validate(req.body, schema);
    if (!result.error) {
      sql.connect(config, err => {
        new sql.Request()
          .input("CompCode", sql.VarChar, req.body.CompCode)
          .input("CompName", sql.VarChar, req.body.CompName)
          .input("Telephone", sql.VarChar, req.body.Telephone)
          .input("Fax", sql.VarChar, req.body.Fax)
          .input("Email", sql.VarChar, req.body.Email)
          .input("Website", sql.VarChar, req.body.Website)
          .input("PostalAddress", sql.VarChar, req.body.PostalAddress)
          .input("Street", sql.VarChar, req.body.Street)
          .input("Country", sql.VarChar, req.body.Country)
          .input("County", sql.VarChar, req.body.County)
          .input("PINNo", sql.VarChar, req.body.PINNo)
          .input("NHIFNo", sql.VarChar, req.body.NHIFNo)
          .input("NSSFNo", sql.VarChar, req.body.NSSFNo)
          .input("Logo", sql.VarChar, null)
          .input("BaseCurr", sql.VarChar, req.body.BaseCurr)
          .input("UserID", sql.VarChar, res.locals.user)
          .input("Terminus", sql.VarChar, req.ip[0])

          .execute("spSaveCompanies", (err, result) => {
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
  .delete("/:CompCode", (req, res) => {
    const CompCode = req.params.CompCode;
    sql.connect(config, err => {
      new sql.Request()
        .input("CompCode", sql.VarChar, CompCode)
        .input("UserID", sql.VarChar, res.locals.user)
        .input("Terminus", sql.VarChar, req.ip[0])
        .execute("spDeleteCompanies", (err, result) => {
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
  .get("/:CompCode", (req, res) => {
    let CompCode = req.params.CompCode;
    sql.connect(config, err => {
      new sql.Request()
        .input("CompCode", sql.VarChar, CompCode)
        .input("UserID", sql.VarChar, res.locals.user)
        .input("Terminus", sql.VarChar, req.ip[0])
        .execute("spSelectCompanies", (err, result) => {
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

module.exports = Company;