"use strict";
let bodyParser = require('body-parser');
let conn = require('../controllers/connectionCtrl.js');
let userRouter = require('express').Router();

userRouter.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});

let getUsers = function (req, res) {
    "use strict";
    // Show all users
    let sql = "SELECT u.Name, u.Surname, u.Mail, u.Phone_Number FROM User AS u";
    querySql(req, res, sql);
};
let getUser = function (req, res) {
    "use strict";
    // Show specific user
    let userId = req.params.UserId;
    let sql = "SELECT u.Name, u.Surname, u.Mail, u.Phone_Number FROM User AS u WHERE u.User_Id = " + userId;
    querySql(req, res, sql);
};
let validateUser = function (user) {

};
let addUser = function (req, res) {
    "use strict";
    // Create new user
    console.log(req.body);
    let user = {
        // name: req.body.name,
        name: function () {
            let name;
            if (req.body.hasOwnProperty('name')) {
                name = req.body.name;
                name = name.replace(/'/g, "\\'");
            } else {
                console.log('No user name');
                name = '';
            }
            return name;
        },
        surname: function () {
            let surname;
            if (req.body.hasOwnProperty('surname')) {
                surname = req.body.surname;
                surname = surname.replace(/'/g, "\\'");
            } else {
                surname = null;
            }
            return surname;
        },
        mail: function () {
            let mail;
            if (req.body.hasOwnProperty('mail')) {
                mail = req.body.mail;
                mail = mail.replace(/'/g, "\\'");
            } else {
                mail = null;
            }
            return mail;
        },
        phone: function () {
            let phone;
            if (req.body.hasOwnProperty('phone')) {
                phone = req.body.phone;
                phone = phone.replace(/'/g, "\\'");
            } else {
                phone = null;
            }
            return phone;
        },
        login: function () {
            let login;
            if (req.body.hasOwnProperty('login')) {
                login = req.body.login;
                login = login.replace(/'/g, "\\'");
            } else {
                login = null;
            }
            return login;
        },
        pass: function () {
            let pass;
            if (req.body.hasOwnProperty('pass')) {
                pass = req.body.pass;
                pass = pass.replace(/'/g, "\\'");
            } else {
                pass = null;
            }
            return pass;
        }
    };

    let sql = "INSERT INTO User (Name, Surname, Mail, Phone_Number) VALUES(" + user.name() + ", " + user.surname() + ", " + user.mail() + ", " + user.phone() + ")";
    // INSERT INTO User_Account (User_Id, Login, Password) VALUES(LAST_INSERT_ID(), " + user.login() + ", " + user.pass() + ") COMMIT";
    console.log(sql);
    querySql(req, res, sql);
};
let editUser = function (req, res) {
    "use strict";

};
let addRole = function (req, res) {
    "use strict";
    // Set user role

    let userId = req.params.UserId;
    let role = req.params.RoleId;
    let sql = "INSERT INTO user_per_role (User_Id, Role_Id) VALUES(" + userId + ", " + role + ");";
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
// ######### ROOT URI: /api/user #########
// #######################################

// create application/json parser
var jsonParser = bodyParser.json();

// Show all users
userRouter.get('/', getUsers);
// Create new user
userRouter.post('/', addUser);
// Show specific user
userRouter.get('/:UserId', getUser);
// Edit specific user
userRouter.put('/:UserId', editUser);
// Add role to user
userRouter.post('/role', addRole);

// #######################################
// ############ ROUTER EXPORT ############
// #######################################

module.exports = userRouter;