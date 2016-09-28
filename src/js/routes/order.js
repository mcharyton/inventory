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

let showDetailedOrder = function (req, res) {
    "use strict";
    // Show inventory
    let sql = "SELECT Inventory.Label, Order_Detail.Quantity, Order_Detail.`Comment`, Order_Detail.Status_Id, Order_Detail.Status_Change_Date, Order_Detail.Order_Date, Order_Detail.Realization_Date, Order_Detail.Price, Order_Detail.Approved, Order_Detail.Approved_Date, `User`.`Name`, `User`.Surname, Order_Detail.Order_Id FROM Order_Detail INNER JOIN `User` ON Order_Detail.User_Id = `User`.User_Id INNER JOIN Inventory ON Order_Detail.Inventory_Id = Inventory.Inventory_Id";

    if (req.params.id) {
        let order = req.params.id;
        sql += " WHERE Order_Detail.Order_Detail_Id = " + order;
    }

    querySql(req, res, sql);
};

let addInventory = function (req, res) {
    "use strict";
    let inventory = {
        label: function () {
            let value;
            if (req.body.hasOwnProperty('label')) {
                value = req.body.label;
                value = value.replace(/'/g, "\\'");
            } else {
                console.log('No label');
                return;
            }
            return value;
        },
        price: function () {
            let value;
            if (req.body.hasOwnProperty('price')) {
                value = req.body.price;
                value = value.replace(/'/g, "\\'");
            } else {
                return null;
            }
            return value;
        },
        details: function () {
            let value;
            if (req.body.hasOwnProperty('details')) {
                value = req.body.details;
                value = value.replace(/'/g, "\\'");
            } else {
                return null;
            }
            return value;
        },
        sn: function () {
            let value;
            if (req.body.hasOwnProperty('sn')) {
                value = req.body.sn;
                value = value.replace(/'/g, "\\'");
            } else {
                return null;
            }
            return value;
        },
        status: function () {
            let value;
            if (req.body.hasOwnProperty('status')) {
                value = req.body.status;
                value = value.replace(/'/g, "\\'");
            } else {
                return null;
            }
            return value;
        },
        status_change_date: function () {
            let value;
            if (req.body.hasOwnProperty('status_change_date')) {
                value = req.body.status_change_date;
                value = value.replace(/'/g, "\\'");
            } else {
                return null;
            }
            return value;
        },
        type: function () {
            let value;
            if (req.body.hasOwnProperty('type')) {
                value = req.body.type;
                value = value.replace(/'/g, "\\'");
            } else {
                console.log('No type provided');
                return;
            }
            return value;
        },
        provider: function () {
            let value;
            if (req.body.hasOwnProperty('provider')) {
                value = req.body.provider;
                value = value.replace(/'/g, "\\'");
            } else {
                return null;
            }
            return value;
        }
    };
    let sql = "INSERT INTO Inventory (Label, Price, Details, Serial_Number, Status_Id, Status_Change_Date, Type_Id, Provider_Id) VALUES (" + inventory.label + ", " + inventory.price + ", " + inventory.details + ", " + inventory.sn + ", " + inventory.status + ", " + inventory.status_change_date + ", " + inventory.type + ", " + inventory.provider + ")";
    querySql(req, res, sql);
};

let addProvider = function (req, res) {
    "use strict";
    let provider = {
        name: function () {
            let value;
            if (req.body.hasOwnProperty('name')) {
                value = req.body.name;
                value = value.replace(/'/g, "\\'");
            } else {
                console.log('No provider name provided');
                return;
            }
            return value;
        },
        address: function () {
            let value;
            if (req.body.hasOwnProperty('address')) {
                value = req.body.address;
                value = value.replace(/'/g, "\\'");
            } else {
                return null;
            }
            return value;
        },
        number: function () {
            let value;
            if (req.body.hasOwnProperty('number')) {
                value = req.body.number;
                value = value.replace(/'/g, "\\'");
            } else {
                return null;
            }
            return value;
        },
        mail: function () {
            let value;
            if (req.body.hasOwnProperty('mail')) {
                value = req.body.mail;
                value = value.replace(/'/g, "\\'");
            } else {
                return null;
            }
            return value;
        }

    };
    let sql = "INSERT INTO Providers (Provider_Name, Address, Phone_Number, Email) VALUES ()";
    querySql(req, res, sql);
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
userRouter.post('/provider/', addProvider);

// #######################################
// ############ ROUTER EXPORT ############
// #######################################

module.exports = userRouter;