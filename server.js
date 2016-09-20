/**
 * Created by m.charyton on 27.06.2016.
 */
let express = require('express');
let app = express();
let userRouter = require('./src/js/routes/user.js');
let bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

// Route to Angular App
app.use(express.static(__dirname + '/public'));
app.use('/api/user', userRouter);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});