var express    = require("express");
var router     = express.Router();
var Restaurant = require("../../models/restaurant");
var Promise    = require('bluebird');


router.get('/', function(req, res, next) {


    Restaurant.findAll()
        .then(function(restaurant) {
            res.json(restaurant);
        }).catch(next);

});


module.exports = router;
