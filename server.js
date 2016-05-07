var express = require('express');
var app = express();

app.use('/public', express.static(path.join(__dirname, '../public')));

var port = 8080;
app.listen(port, function () {
	console.log('Server is now listening at port ' + port);
});