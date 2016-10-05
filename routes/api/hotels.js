var express = require("express");
var router  = express.Router();
var Hotel   = require("../../models/hotel");
var Promise = require('bluebird');


router.get('/', function(req, res, next) {


    Hotel.findAll()
        .then(function(hotels) {
            res.json(hotels);
        })
        .catch(next);

});




module.exports = router;
