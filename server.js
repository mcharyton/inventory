/**
 * Created by m.charyton on 27.06.2016.
 */
var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.sendfile('/src/index.html');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});