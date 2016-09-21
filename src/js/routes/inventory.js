/**
 * Created by Dominik on 2016-09-21.
 */
"use strict";
let bodyParser = require('body-parser');
let conn = require('../controllers/connectionCtrl.js');
let userRouter = require('express').Router();

userRouter.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});

let getStatus = function (req, res) {
    "use strict";
    // Show all users
    let userId = req.params.UserId;
    let sql = "SELECT inventory.Inventory_Id, providers.Provider_Name, inventory.Label, inventory_category.Category_Name, inventory_per_user.Start_Date, inventory_per_user.End_Date FROM `user` INNER JOIN inventory_per_user ON inventory_per_user.User_Id = `user`.User_Id INNER JOIN inventory ON inventory_per_user.Inventory_Id = inventory.Inventory_Id INNER JOIN inventory_type ON inventory.Type_Id = inventory_type.Type_Id INNER JOIN inventory_category ON inventory_type.Category_Id = inventory_category.Category_Id INNER JOIN providers ON inventory.Provider_Id = providers.Provider_Id WHERE `user`.User_Id = " + userId;
    querySql(req, res, sql);
};

/*let getPersonInfo = function (req, res) {
    "use strict";
    // Show all users
    let userId = req.params.UserId;
    let sql = "SELECT u.`Name`, u.Surname, u.Mail, u.Phone_Number FROM `user` AS u WHERE u.User_Id = " + userId;
    querySql(req, res, sql);
}; */

let getHistory = function (req, res) {
    "use strict";
    // Show all users
    let userId = req.params.UserId;
    let sql = "SELECT inventory.Inventory_Id, inventory.Label, inventory_category.Category_Name, rent.Start_Date, rent.End_Date FROM `user` INNER JOIN rent ON rent.User_Id = `user`.User_Id INNER JOIN rent_detail ON rent_detail.Rent_Id = rent.Rent_Id INNER JOIN inventory ON rent_detail.Inventory_Id = inventory.Inventory_Id INNER JOIN inventory_type ON inventory.Type_Id = inventory_type.Type_Id INNER JOIN inventory_category ON inventory_type.Category_Id = inventory_category.Category_Id WHERE `user`.User_Id = " + userId;
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
userRouter.get('/:UserId', getStatus);
userRouter.get('/history/:UserId', getHistory);

// #######################################
// ############ ROUTER EXPORT ############
// #######################################

module.exports = userRouter;