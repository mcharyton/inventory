/**
 * Created by Dominik on 2016-09-28.
 */
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

let showCategory = function (req, res) {
    "use strict";
    // Show inventory
    let sql = "SELECT Inventory_Category.Category_Id, Inventory_Category.Category_Name, Inventory_Category.Category_Details FROM Inventory_Category";


    querySql(req, res, sql);
};


let showType = function (req, res) {
    "use strict";
    // Show inventory
    let sql = "SELECT Inventory_Type.Type_Id, Inventory_Type.Category_Id, Inventory_Type.Type_Details, Inventory_Type.Type_Name FROM Inventory_Type";

    if (req.params.id) {
        let category = req.params.id;
        sql += " WHERE Inventory_Type.Category_Id = " + category;
    }
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
// ######## ROOT URI: /api/other #####
// #######################################

// create application/json parser
var jsonParser = bodyParser.json();

// Show specific inventory
userRouter.get('/type', showType);
userRouter.get('/type/:id', showType);
userRouter.get('/category', showCategory);


// #######################################
// ############ ROUTER EXPORT ############
// #######################################

module.exports = userRouter;