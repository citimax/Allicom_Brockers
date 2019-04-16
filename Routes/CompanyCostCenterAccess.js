const express = require("express");
const CompanyCostCenterAccess = express.Router();
var sql = require("mssql");
const config = require("../database");
const AppConstant = require("../AppConstant");
const Joi = require("joi");
CompanyCostCenterAccess.get("/", (req, res) => {
  sql.connect(config, err => {
    new sql.Request()
      .input("UserID", sql.VarChar, AppConstant.userName)
      .input("Terminus", sql.VarChar, AppConstant.Terminus)
      .execute("spSelectAllCompanyCostCenterAccess", (err, result) => {
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
      UserName: Joi.string()
        .min(2)
        .max(50)
        .required(),
      CompCode: Joi.string()
        .min(3)
        .required(),
      CostCenter: Joi.string()
        .min(3)
        .required(),
      EffectiveDate: Joi.date().required(),
      Narration: Joi.string()
        .min(3)
        .required()
    });

    const result = Joi.validate(req.body, schema);
    if (!result.error) {
      sql.connect(config, err => {
        new sql.Request()
          .input("UserName", sql.VarChar, req.body.UserName)
          .input("CompCode", sql.VarChar, req.body.CompCode)
          .input("CostCenter", sql.VarChar, req.body.CostCenter)
          .input("EffectiveDate", sql.VarChar, req.body.EffectiveDate)
          .input("Narration", sql.VarChar, req.body.Narration)
          .input("Terminus", sql.VarChar, AppConstant.Terminus)
          .input("UserID", sql.VarChar, AppConstant.userName)
          .execute("spSaveCompanyCostCenterAccess", (err, result) => {
            if (err) {
              res.json({ success: false, message: err.message });
            } else {
              res.json({ success: true, message: "Saved" });
            }
            sql.close();
          });
      });
    } else {
      res.json({ success: false, message: result.error.details[0].message });
    }
  })
  .delete("/:UserName/:CompCode/:CostCenter", (req, res) => {
    const UserName = req.params.UserName;
    const CompCode = req.params.CompCode;
    const CostCenter = req.params.CostCenter;
    sql.connect(config, err => {
      new sql.Request()
        .input("UserName", sql.VarChar, UserName)
        .input("CompCode", sql.VarChar, CompCode)
        .input("CostCenter", sql.VarChar, CostCenter)
        .input("UserID", sql.VarChar, AppConstant.userName)
        .input("Terminus", sql.VarChar, AppConstant.Terminus)
        .execute("spDeleteCompanyCostCenterAccess", (err, result) => {
          if (err) {
            res.json({ success: false, message: err.message });
          } else {
            res.json({ success: true, message: "deleted" });
          }
          sql.close();
        });
    });
  })
  .get("/:UserName/:CompCode/:CostCenter", (req, res) => {
    const CCCode = req.params.CCCode;
    sql.connect(config, err => {
      new sql.Request()
        .input("UserName", sql.VarChar, UserName)
        .input("CompCode", sql.VarChar, CompCode)
        .input("CostCenter", sql.VarChar, CostCenter)
        .input("UserID", sql.VarChar, AppConstant.userName)
        .input("Terminus", sql.VarChar, AppConstant.Terminus)
        .execute("spSelectCompanyCostCenterAccess", (err, result) => {
          if (err) {
            res.json({ success: false, message: err.message });
          } else {
            res.status(200).send(result.recordset);
          }
          sql.close();
        });
    });
  });

module.exports = CompanyCostCenterAccess;
