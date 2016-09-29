/**
 * Created by m.charyton on 21.09.2016.
 */
"use strict";
let bodyParser = require('body-parser');
let conn = require('../controllers/connectionCtrl.js');
let userRouter = require('express').Router();

userRouter.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});

let showRent = function (req, res) {
    "use strict";
    // Show inventory
    let sql = "SELECT\
    Rent.Rent_Id,\
        Rent.`Comment`,\
        Rent.Start_Date,\
        Rent.End_Date,\
        Rent_Detail.Rent_Detail_Id,\
        Rent_Detail.Inventory_Id,\
        Rent_Detail.Quantity,\
        `Status`.Status_Name,\
        Inventory_Category.Category_Name,\
        Inventory_Type.Type_Name,\
        `User`.`Name`,\
        `User`.Surname,\
        Rent.Status_Change_Date,\
        Inventory.Label,\
        Inventory.Serial_Number,\
        Inventory_Category.Category_Id,\
        Inventory_Type.Type_Id\
    FROM\
    Rent\
    INNER JOIN Rent_Detail ON Rent_Detail.Rent_Id = Rent.Rent_Id\
    INNER JOIN `Status` ON Rent.Status_Id = `Status`.Status_Id\
    INNER JOIN Inventory ON Rent_Detail.Inventory_Id = Inventory.Inventory_Id\
    INNER JOIN Inventory_Type ON Inventory_Type.Type_Id = Inventory.Type_Id\
    INNER JOIN `User` ON Rent.User_Id = `User`.User_Id\
    INNER JOIN Inventory_Category ON Inventory_Category.Category_Id = Inventory_Type.Category_Id";

    /* if (req.body.hasOwnProperty("inventory")) {
        let inventory = req.body.inventory;
        sql += sql + " WHERE Inventory.Inventory_Id IN ( " + inventory + ")"
     } */

    querySql(req, res, sql);
};

let addRent = function (req, res) {
    "use strict";
    let rent = {
        /*  label: function () {
            let value;
            if (req.body.hasOwnProperty('label')) {
                value = req.body.label;
                value = value.replace(/'/g, "\\'");
            } else {
                console.log('No label');
                return;
            }
            return value;
         },*/
        category: function () {
            let value;
            if (req.body.hasOwnProperty('selectedCategory')) {
                value = req.body.selectedCategory;
                value = value.replace(/'/g, "\\'");
            } else {
                console.log('No category');
                return;
            }
            return value;
        },
        typeId: function () {
            let value;
            if (req.body.hasOwnProperty('typeId')) {
                value = req.body.typeId;
                value = value.replace(/'/g, "\\'");
            } else {
                console.log('No typeId');
                return;
            }
            return value;
        },
        quantity: function () {
            let value;
            if (req.body.hasOwnProperty('quantity')) {
                value = req.body.quantity;
                value = value.replace(/'/g, "\\'");
            } else {
                console.log('No quantity');
                return;
            }
            return value;
        },
        fromDate: function () {
            let value;
            if (req.body.hasOwnProperty('fromDate')) {
                value = req.body.fromDate;
                value = value.replace(/'/g, "\\'");
            } else {
                console.log('No fromDate');
                return;
            }
            return value;
        },
        toDate: function () {
            let value;
            if (req.body.hasOwnProperty('toDate')) {
                value = req.body.toDate;
                value = value.replace(/'/g, "\\'");
            } else {
                console.log('No toDate');
                return;
            }
            return value;
        },
        comment: function () {
            let value;
            if (req.body.hasOwnProperty('comment')) {
                value = req.body.comment;
                value = value.replace(/'/g, "\\'");
            } else {
                console.log('No comment');
                return;
            }
            return value;
        }
    };


    conn.pool.getConnection(function (err, connection) {
        if (err) {
            res.json({"code": 200, "status": "Error in connection to database: " + err});
            return;
        }

        console.log("connected as: " + connection.threadId);

        connection.beginTransaction(function (err) {
            if (err) {
                throw err;
            }

            let sql = "INSERT INTO Rent (User_Id, Comment, Start_Date, End_Date, Status_Id, Status_Change_Date)  VALUES ('1', '" + rent.comment() + "', " + rent.fromDate() + ", " + rent.toDate() + ", 1 , NOW() )";

            connection.query(sql, function (err, rows) {
                connection.release();
                if (err) {
                    console.log(err);
                    return connection.rollback(function () {
                        throw err;
                    });
                }
                let rentId = rows.insertId;
                let sql2 = "INSERT INTO Rent_Detail (Rent_Id, Type_Id, Quantity, Status, Status_Change_Date VALUES(" + rentId + ", " + rent.typeId() + ", " + rent.quantity() + ", 1 , NOW() )";

                connection.query(sql2, function (err, rows) {
                    if (err) {
                        console.log(err);
                        return connection.rollback(function () {
                            throw err;
                        });
                    }

                    connection.commit(function (err) {
                        if (err) {
                            return connection.rollback(function () {
                                throw err;
                            });
                        }
                        console.log("Success!:");
                        console.log(rows);
                        res.send("Rent order added successfully!");
                        return rows;
                    });
                });
            });
        });
    });
};

let changeStatus = function (req, res) {
    "use strict";
    if (req.body.hasOwnProperty("status")) {
        let status = req.body.status;
    }
    if (req.body.hasOwnProperty("inventory_id")) {
        let inventory_id = req.body.inventory_id;
    }

    let sql = "UPDATE Inventory SET Status_Id = " + status + " WHERE Inventory.Inventory_Id =" + inventory_id;
    querySql(req, res, sql);
};

function querySql(req, res, sql) {
    "use strict";
    conn.pool.getConnection(function (err, connection) {
        if (err) {
            res.json({"code": 200, "status": "Error in connection to database: " + err});
            return;
        }

        console.log("connected as: " + connection.threadId);

        connection.query(sql, function (err, rows) {
            connection.release();
            if (!err) {
                console.log(rows);
                res.json(rows);
            } else {
                console.log(err);
            }
        });

        connection.on('error', function (err) {
            res.json({"code": 100, "status": "error in query: " + err});

        });
    });
}
// #######################################
// ################ ROUTES ###############
// ######## ROOT URI: /api/rent #####
// #######################################

// create application/json parser
var jsonParser = bodyParser.json();

// Show specific inventory
userRouter.get('/', showRent);
userRouter.post('/', addRent);
//userRouter.post('/provider/', addProvider);

// #######################################
// ############ ROUTER EXPORT ############
// #######################################

module.exports = userRouter;