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


let showDetailedOrder = function (req, res) {
    "use strict";
    // Show inventory
    let sql = "SELECT Order_Detail.Quantity, Inventory.Label, Order_Detail.`Comment`, Order_Detail.Status_Id, Order_Detail.Status_Change_Date, Order_Detail.Order_Date, Order_Detail.Realization_Date, Order_Detail.Price, Order_Detail.Approved, Order_Detail.Approved_Date, `User`.`Name`, `User`.Surname, Order_Detail.Order_Id, Inventory_Category.Category_Name, Inventory_Type.Type_Name FROM Order_Detail INNER JOIN `User` ON Order_Detail.User_Id = `User`.User_Id INNER JOIN Inventory ON Order_Detail.Inventory_Id = Inventory.Inventory_Id INNER JOIN Inventory_Type ON Inventory.Type_Id = Inventory_Type.Type_Id INNER JOIN Inventory_Category ON Inventory_Type.Category_Id = Inventory_Category.Category_Id";

    querySql(req, res, sql);
};

let addOrder = function (req, res) {
    "use strict";
    let order = {
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
        order_quantity: function () {
            let value;
            if (req.body.hasOwnProperty('quantity')) {
                value = req.body.quantity;
            } else {
                console.log('No quantity');
                return;
            }
            return value;
        },
        delivery_date: function () {
            let value;
            if (req.body.hasOwnProperty('deliveryDate')) {
                value = req.body.deliveryDate;
                value = new Date(value).toMysqlFormat();
            } else {
                console.log('No delivery date');
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

            let sql = "INSERT INTO `Order` (User_Id, Status_Id, Status_Change_Date, Order_Date, Delivery_Date) VALUES (1, 1, NOW(), NOW(), '" + order.delivery_date() + "' )";
            console.log(sql);
            connection.query(sql, function (err, rows) {
                connection.release();
                if (err) {
                    console.log(err);
                    return connection.rollback(function () {
                        throw err;
                    });
                }
                let orderId = rows.insertId;
                let sql2 = "INSERT INTO Order_Detail (Order_Id, Type_Id, User_Id, Quantity, Comment, Status_Id, Status_Change_Date, Order_Date, Realization_Date) VALUES (" + orderId + ", " + order.typeId() + ", 1," + order.order_quantity() + ", '" + order.comment() + "', 1, NOW(), NOW(), '" + order.delivery_date() + "' )";
                console.log(sql2);
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
                        res.send("Order added successfully!");
                        return rows;
                    });
                });
            });
        });
    });
};


let changeStatus = function (req, res) {
    "use strict";
    if (req.body.hasOwnProperty("status_id")) {
        let status_id = req.body.status_id;
    }
    if (req.body.hasOwnProperty("inventory_id")) {
        let inventory_id = req.body.inventory_id;
    }

    let sql = "UPDATE Inventory SET Status_Id = " + status_id + " WHERE Inventory.Inventory_Id =" + inventory_id;
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
// ######## ROOT URI: /api/inventory #####
// #######################################

// create application/json parser
var jsonParser = bodyParser.json();

// Show specific inventory
// userRouter.get('/orders/', showOrder);
userRouter.get('/', showDetailedOrder);
userRouter.get('/:id', showDetailedOrder);
userRouter.post('/', addOrder);

// #######################################
// ############ ROUTER EXPORT ############
// #######################################

module.exports = userRouter;