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

/**
 * You first need to create a formatting function to pad numbers to two digits…
 **/
function twoDigits(d) {
    if (0 <= d && d < 10) return "0" + d.toString();
    if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
    return d.toString();
}

/**
 * …and then create the method to output the date string as desired.
 * Some people hate using prototypes this way, but if you are going
 * to apply this to more than one Date object, having it as a prototype
 * makes sense.
 **/
Date.prototype.toMysqlFormat = function () {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};

let showRent = function (req, res) {
    "use strict";
    // Show inventory
    let sql = "SELECT\
    Rent.Rent_Id,\
        `User`.`Name`,\
        `User`.Surname,\
        Inventory_Type.Type_Name,\
        Rent_Detail.Quantity,\
        Rent.Start_Date,\
        Rent.End_Date,\
        Rent.`Comment`\
    FROM\
    Rent\
    INNER JOIN Rent_Detail ON Rent_Detail.Rent_Id = Rent.Rent_Id\
    INNER JOIN `User` ON Rent.User_Id = `User`.User_Id\
    INNER JOIN Inventory_Type ON Rent_Detail.Type_Id = Inventory_Type.Type_Id\
    ";

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
            if (req.body.hasOwnProperty('selectedType')) {
                value = req.body.selectedType;
                value = value.replace(/'/g, "\\'");
            } else {
                console.log('No typeId');
                return;
            }
            return value;
        },
        quantity: function () {
            let value;
            if (req.body.hasOwnProperty('rQuantity')) {
                value = req.body.rQuantity;
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
                value = new Date(value).toMysqlFormat();
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
                value = new Date(value).toMysqlFormat();
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

            let sql = "INSERT INTO Rent (User_Id, Comment, Start_Date, End_Date, Status_Id, Status_Change_Date)  VALUES ('1', '" + rent.comment() + "', '" + rent.fromDate() + "', '" + rent.toDate() + "', 1 , NOW() )";
            console.log(sql);
            connection.query(sql, function (err, rows) {
                connection.release();
                if (err) {
                    console.log(err);
                    return connection.rollback(function () {
                        throw err;
                    });
                }
                let rentId = rows.insertId;
                let sql2 = "INSERT INTO Rent_Detail (Rent_Id, Type_Id, Quantity, Status_Id, Status_Change_Date) VALUES (" + rentId + ", " + rent.typeId() + ", " + rent.quantity() + ", 1 , NOW() )";
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