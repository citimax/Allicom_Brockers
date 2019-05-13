 .input("Code", sql.nvarchar, req.body.Code)
     .input("Name", sql.nvarchar, req.body.Name)
     .input("UserID", sql.VarChar, res.locals.user)
     .input("Terminus", sql.VarChar, req.ip[0])