
var db = require("../models");
module.exports = function (app) {
    //Index route, renders index.handlebars

    app.get('/', function (req, res) {
        res.render('index', {});
    });
    //GET route for retrieving all moves
    app.get('/api/moves', function (req, res) {
        db.Moves.findAll({}).then(function (dbMoves) {
            res.json(dbMoves);
        });
    });
    //get route for retrieving single move
    app.get('/api/moves/:move_name', function (req, res) {
        db.Moves.findOne({
            where: {
                move_name: req.params.move_name
            }
        }).then(function (dbMoves) {
            res.json(dbMoves);
        });
    });
    app.get('/api/moves/id/:id', function (req, res) {
        db.Moves.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (dbMoves) {
            res.json(dbCat);
        });
    });
    //POST route for saving new move
    app.post('/api/cats', function (req, res) {
        db.Moves.create({
            move_name: req.body.move_name,
            atk: req.body.atk,
            def: req.body.def
        }).then(function (dbMoves) {
            res.json(dbMoves);
        });
    });
    //DELETE route for deleting moves
    app.delete('/api/moves/:move_name', function (req, res) {
        db.Moves.destroy({
            where: {
                move_name: req.params.move_name
            }
        }).then(function (dbMoves) {
            res.json(dbMoves);
        });
    });
    // PUT route for updating moves
    app.put('/api/moves', function (req, res) {
        db.Moves.update(req.body, {
            where: {
                move_name: req.body.move_name
            }
        }).then(function (dbMoves) {
            res.json(dbMoves);
        });
    });
};