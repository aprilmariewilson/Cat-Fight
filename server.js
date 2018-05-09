var express = require("express");


var app = express();
var PORT = process.env.PORT || 3301;


app.listen(PORT, function() {
	console.log("app now listening on PORT: " + PORT);
});
