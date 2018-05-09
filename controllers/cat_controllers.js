var db = require("../models");


module.exports = function (app) {
    //Index route, renders index.handlebars
    app.get("/", function (req, res) {
        res.render("index", {}
        );
    });


    app.get("/api/cats", function (req, res) {
            //Get all cats api
    });

    app.post("/api/newcat", function (req, res) {
        //Post new cat
    });
}