/**
 * Created by m.charyton on 27.06.2016.
 */
let express = require('express');
let app = express();
let userRouter = require('./src/js/routes/user.js');
let inventoryRouter = require('./src/js/routes/inventory.js');
let orderRouter = require('./src/js/routes/order.js');
let rentRouter = require('./src/js/routes/rent.js');
let otherRouter = require('./src/js/routes/others.js');
let bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

app.get('/404', function (req, res) {
    res.status(404).send('Not found');
});

app.use('/api/', function (req, res, next) {
    console.log('Sprawdzam...');
    next();

});
// Api routes
app.use('/api/user', userRouter);
app.use('/api/inventory', inventoryRouter);
app.use('/api/order', orderRouter);
app.use('/api/rent', rentRouter);
app.use('/api/other', otherRouter);

// Route to Angular App
app.use(express.static(__dirname + '/public'));
// app.use(app.router);
app.use(function (req, res) {
    // "use strict";
    res.sendFile(__dirname + '/public/');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});