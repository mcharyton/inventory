/**
 * Created by m.charyton on 29.09.2016.
 */
let bodyParser = require('body-parser');
let conn = require('../controllers/connectionCtrl.js');
let userRouter = require('express').Router();
let jwt = require('jsonwebtoken');

userRouter.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});

let checkUser = function (req, res) {
    "use strict";
    console.log(req.body);
    let user = {
        name: req.body.email,
        pass: req.body.pass
    };

    if (user.name == '' || user.pass == '') {
        return res.status(401);
        console.log('401');
    }

    let sql = "SELECT\
    User_Account.User_Id,\
        User_Account.Login,\
        User_Account.`Password`\
    FROM\
    User_Account\
    WHERE\
    User_Account.Login = '" + user.name + "' AND\
    User_Account.`Password` = '" + user.pass + "'";
    console.log(sql);

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
                if (rows.length > 0) {
                    console.log("User: ");
                    console.log(user);
                    let token = jwt.sign(user, 'abs1');
                    // let token = jwt.sign(user, 'abs1', {expiresInMinutes: 60});
                    res.json({
                        code: true,
                        valid: true,
                        data: token
                    });
                } else {
                    res.json({
                        code: 201,
                        valid: false,
                        data: "Wrong user or password "
                    });
                    console.log("User doesnt exist");
                }

            } else {
                res.json({
                    code: 201,
                    valid: false,
                    data: "Wrong user or password "
                });
                console.log(err);
            }
        });

        connection.on('error', function (err) {
            res.json({"code": 100, "status": "error in query: " + err});

        });
    });
};
// #######################################
// ################ ROUTES ###############
// ######## ROOT URI: /authenticate/ #####
// #######################################

// create application/json parser
var jsonParser = bodyParser.json();

userRouter.post('/', checkUser);

// #######################################
// ############ ROUTER EXPORT ############
// #######################################

module.exports = userRouter;