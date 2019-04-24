const express = require("express");
const Usergroups = express.Router();
var sql = require("mssql");
const config = require("../database");
const AppConstant = require("../AppConstant");
const Joi = require("joi");
Usergroups.get("/", (req, res) => {
  sql.connect(config, err => {
    new sql.Request()
      .input("UserID", sql.VarChar, AppConstant.userName)
      .input("Terminus", sql.VarChar, AppConstant.Terminus)
      .execute("spSelectAllUserGroups", (err, result) => {
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
      GroupCode: Joi.string()
        .min(3)
        .required(),
      Narration: Joi.string()
        .min(3)
        .required()
    });

    const result = Joi.validate(req.body, schema);
    if (!result.error) {
      sql.connect(config, err => {
        new sql.Request()
          .input("UserName", sql.VarChar, req.body.UserName)
          .input("GroupCode", sql.VarChar, req.body.GroupCode)
          .input("Narration", sql.VarChar, req.body.Narration)
          .input("Terminus", sql.VarChar, AppConstant.Terminus)
          .input("UserID", sql.VarChar, AppConstant.userName)
          .execute("spSaveUserGroups", (err, result) => {
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
  .delete("/:UserName/:GroupCode", (req, res) => {
    const UserName = req.params.UserName;
    const GroupCode = req.params.GroupCode;
    sql.connect(config, err => {
      new sql.Request()
        .input("UserName", sql.VarChar, UserName)
        .input("GroupCode", sql.VarChar, GroupCode)
        .input("UserID", sql.VarChar, AppConstant.userName)
        .input("Terminus", sql.VarChar, AppConstant.Terminus)
        .execute("spDeleteUserGroups", (err, result) => {
          if (err) {
            res.json({ success: false, message: err.message });
          } else {
            res.json({ success: true, message: "deleted" });
          }
          sql.close();
        });
    });
  })
  .get("/:UserName/:GroupCode", (req, res) => {
    let UserName = req.params.UserName;
    let GroupCode = req.params.GroupCode;
    sql.connect(config, err => {
      new sql.Request()
        .input("UserName", sql.VarChar, UserName)
        .input("GroupCode", sql.VarChar, GroupCode)
        .input("UserID", sql.VarChar, AppConstant.userName)
        .input("Terminus", sql.VarChar, AppConstant.Terminus)
        .execute("spSelectUserGroups", (err, result) => {
          if (err) {
            res.json({ success: false, message: err.message });
          } else {
            res.status(200).send(result.recordset);
          }
          sql.close();
        });
    });
  });

module.exports = Usergroups;
