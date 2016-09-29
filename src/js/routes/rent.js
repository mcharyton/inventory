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

let showInventory = function (req, res) {
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
// ######## ROOT URI: /api/inventory #####
// #######################################

// create application/json parser
var jsonParser = bodyParser.json();

// Show specific inventory
userRouter.get('/', showInventory);
userRouter.post('/', addInventory);
userRouter.post('/provider/', addProvider);

// #######################################
// ############ ROUTER EXPORT ############
// #######################################

module.exports = userRouter;