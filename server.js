var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");

var app = express();
var PORT = process.env.PORT || 3301;

//Use body-parser to parse req/requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Set the view engine to handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


//This line makes the static directory for "./public/assets" while the server is running
//Use eg. in main.handlebars the link to css will be "./assets/css/style.css"
app.use('/assets', express.static('public/assets'));
require("./controllers/cat_controllers")(app);
require("./controllers/moves_controllers")(app);

app.listen(PORT, function() {
	console.log("app now listening on PORT: " + PORT);
});
