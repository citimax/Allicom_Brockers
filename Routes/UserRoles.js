const express = require("express");
const UserRoles = express.Router();
var sql = require("mssql");
const config = require("../database");
const AppConstant = require("../AppConstant");
const Joi = require("joi");
UserRoles.get("/", (req, res) => {
  sql.connect(config, err => {
    new sql.Request()
      .input("UserID", sql.VarChar, AppConstant.userName)
      .input("Terminus", sql.VarChar, AppConstant.Terminus)
      .execute("spSelectAllUserRoles", (err, result) => {
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
      UserGroup: Joi.string()
        .min(2)
        .max(50)
        .required(),
      SecurityModule: Joi.string()
        .min(3)
        .required(),
      View: Joi.bool().required(),
      Add: Joi.bool().required(),
      Edit: Joi.bool().required(),
      Delete: Joi.bool().required(),
      Export: Joi.bool().required(),
      Import: Joi.bool().required(),
      ExpiryDate: Joi.date().required()
    });

    const result = Joi.validate(req.body, schema);
    if (!result.error) {
      sql.connect(config, err => {
        new sql.Request()
          .input("UserGroup", sql.VarChar, req.body.UserGroup)
          .input("SecurityModule", sql.VarChar, req.body.SecurityModule)
          .input("View", sql.Bit, req.body.View)
          .input("Add", sql.Bit, req.body.Add)
          .input("Edit", sql.Bit, req.body.Edit)
          .input("Delete", sql.Bit, req.body.Delete)
          .input("Export", sql.Bit, req.body.Export)
          .input("Import", sql.Bit, req.body.Export)
          .input("ExpiryDate", sql.Date, req.body.ExpiryDate)
          .input("Terminus", sql.VarChar, AppConstant.Terminus)
          .input("UserID", sql.VarChar, AppConstant.userName)
          .execute("spSaveUserRoles", (err, result) => {
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
  .delete("/:UserGroup/:SecurityModule", (req, res) => {
    const UserGroup = req.params.UserGroup;
    const SecurityModule = req.params.SecurityModule;
    sql.connect(config, err => {
      new sql.Request()
        .input("UserGroup", sql.VarChar, UserGroup)
        .input("SecurityModule", sql.VarChar, SecurityModule)
        .input("UserID", sql.VarChar, AppConstant.userName)
        .input("Terminus", sql.VarChar, AppConstant.Terminus)
        .execute("spDeleteUserRoles", (err, result) => {
          if (err) {
            res.json({ success: false, message: err.message });
          } else {
            res.json({ success: true, message: "deleted" });
          }
          sql.close();
        });
    });
  })
  .get("/:UserGroup/:SecurityModule", (req, res) => {
    let UserGroup = req.params.UserGroup;
    let SecurityModule = req.params.SecurityModule;
    sql.connect(config, err => {
      new sql.Request()
        .input("UserGroup", sql.VarChar, UserGroup)
        .input("SecurityModule", sql.VarChar, SecurityModule)
        .input("UserID", sql.VarChar, AppConstant.userName)
        .input("Terminus", sql.VarChar, AppConstant.Terminus)
        .execute("spSelectUserRoles", (err, result) => {
          if (err) {
            res.json({ success: false, message: err.message });
          } else {
            res.status(200).send(result.recordset);
          }
          sql.close();
        });
    });
  });

module.exports = UserRoles;
