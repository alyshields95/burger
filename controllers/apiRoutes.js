const routes = require('express').Router();
const Burger = require("../models/burger.js");


routes.post('/add', (req, res) => {

    console.log("body", req.body);

    const { burger_name, devoured } = req.body;

    Burger.create({
        burger_name: burger_name,
        devoured: devoured
    }).then(function (results) {
        res.json(results);
    }).catch(err => { throw err });
});

routes.get("/all", function (req, res) {


    Burger.findAll({}).then(function (results) {

        console.log(results);
        res.json(results);

    }).catch(err => { throw err });
});

routes.post("/devour", (req, res) => {
    console.log("body", req.body);
    const { id } = req.body;

    Burger.update({
        devoured: true
    }, {
            where: {
                uuid: id
            }
        }).then(results => res.json(results)).catch(err => {
            res.status(500).send("database error");
            throw err;
        })
});

module.exports = routes;