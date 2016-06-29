/**
 * Created by m.charyton on 27.06.2016.
 */
var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/src/index.html');
});
app.use('/css', express.static(__dirname + '/src/css'));
app.use('/images', express.static(__dirname + '/src/images'));
app.use('/js', express.static(__dirname + '/src/js'));
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});