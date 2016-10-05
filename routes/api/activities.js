var express  = require("express");
var router   = express.Router();
var Activity = require("../../models/activity");
var Promise  = require('bluebird');


router.get('/', function(req, res, next) {


    Activity.findAll()
        .then(function(activity) {
            res.json(activity);
        })
        .catch(next);

});



module.exports = router;
