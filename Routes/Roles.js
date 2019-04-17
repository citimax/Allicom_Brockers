const express = require("express");
const Roles = express.Router();
var sql = require("mssql");
const config = require("../database");
const AppConstant = require("../AppConstant");
const Joi = require("joi");
const bcrypt = require("bcrypt");

Roles.get("/", (req, res) => {
        sql.connect(config, err => {
            new sql.Request()
                .input("UserID", sql.VarChar, AppConstant.userName)
                .input("Terminus", sql.VarChar, AppConstant.Terminus)
                .execute("spSelectAllRoles", (err, result) => {
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
            RoleName: Joi.string()
                .min(3)
                .max(50)
                .required(),
            Narration: Joi.string()
                .min(3)
                .max(500)
                .required()
        });

        const result = Joi.validate(req.body, schema);
        if (!result.error) {
            sql.connect(config, err => {
                new sql.Request()
                    .input("RoleName", sql.VarChar, req.body.RoleName)
                    .input("Narration", sql.VarChar, req.body.Narration)
                    .input("UserID", sql.VarChar, AppConstant.userName)
                    .input("Terminus", sql.VarChar, AppConstant.Terminus)
                    .execute("spSaveRoles", (err, result) => {
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
    .delete("/:RoleName", (req, res) => {
        const RoleName = req.params.RoleName;
        sql.connect(config, err => {
            new sql.Request()
                .input("RoleName", sql.VarChar, RoleName)
                .input("UserID", sql.VarChar, AppConstant.userName)
                .input("Terminus", sql.VarChar, AppConstant.Terminus)
                .execute("spDeleteRoles", (err, result) => {
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
    .get("/:RoleName", (req, res) => {
        const RoleName = req.params.RoleName;
        sql.connect(config, err => {
            new sql.Request()
                .input("RoleName", sql.VarChar, RoleName)
                .input("UserID", sql.VarChar, AppConstant.userName)
                .input("Terminus", sql.VarChar, AppConstant.Terminus)
                .execute("spSelectRoles", (err, result) => {
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

module.exports = Roles;