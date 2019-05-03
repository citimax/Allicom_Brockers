const express = require("express");
const Counties = express.Router();
var sql = require("mssql");
const config = require("../database");
const AppConstant = require("../AppConstant");
const Joi = require("joi");
Counties.get("/", (req, res) => {
   const pool = new sql.ConnectionPool(config);
   pool.connect(error => {
    new sql.Request(pool)
      .input("UserID", sql.VarChar, AppConstant.userName)
      .input("Terminus", sql.VarChar, AppConstant.Terminus)
      .execute("spSelectAllCounties", (err, result) => {
        if (err) {
          res.json({ success: false, message: err.message });
        } else {
          res.status(200).json(result.recordset);
        }
        sql.close();
      });
  });
})
  .post("/", (req, res) => {
    const schema = Joi.object().keys({
      CountyCode: Joi.string()
        .min(2)
        .max(50)
        .required(),
      CountyName: Joi.string()
        .min(3)
        .required()
    });

    const result = Joi.validate(req.body, schema);
    if (!result.error) {
      sql.connect(config, err => {
        new sql.Request()
          .input("CountyCode", sql.VarChar, req.body.CountyCode)
          .input("CountyName", sql.VarChar, req.body.CountyName)
          .input("Terminus", sql.VarChar, AppConstant.Terminus)
          .input("UserID", sql.VarChar, AppConstant.userName)
          .execute("spSaveCounties", (err, result) => {
            if (err) {
              res.json({ success: false, message: err.message });
            } else {
              res.json({ success: true, message: "saved" });
            }
            sql.close();
          });
      });
    } else {
      res.json({ success: false, message: result.error.details[0].message });
    }
  })
  .delete("/:CountyCode", (req, res) => {
    const CountyCode = req.params.CountyCode;
    sql.connect(config, err => {
      new sql.Request()
        .input("CountyCode", sql.VarChar, CountyCode)
        .input("UserID", sql.VarChar, AppConstant.userName)
        .input("Terminus", sql.VarChar, AppConstant.Terminus)
        .execute("spDeleteCounties", (err, result) => {
          if (err) {
            res.json({ success: false, message: err.message });
          } else {
            res.json({ success: true, message: "deleted" });
          }
          sql.close();
        });
    });
  })
  .get("/:CountyCode", (req, res) => {
    const CountyCode = req.params.CountyCode;
    sql.connect(config, err => {
      new sql.Request()
        .input("CountyCode", sql.VarChar, CountyCode)
        .input("UserID", sql.VarChar, AppConstant.userName)
        .input("Terminus", sql.VarChar, AppConstant.Terminus)
        .execute("spSelectCounties", (err, result) => {
          if (err) {
            res.json({ success: false, message: err.message });
          } else {
            res.status(200).send(result.recordset);
          }
          sql.close();
        });
    });
  });

module.exports = Counties;
