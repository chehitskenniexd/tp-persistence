var express = require("express");
var router  = express.Router();
var Day     = require("../../models/days.js");
var Promise = require('bluebird');


router.get('/', function(req, res, next) {
    Day.findAll()
        .then(function(day) {
            res.json(day);
        })
        .catch(next);
});

// get a specific day by id
router.get('/:id', (req, res, next) => {
    Day.findById(req.params.id)
        .then(day => res.json(day))
        .catch(next);
})

// create a day
router.post('/', (req, res, next) => {
    Day.create(req.body)
        .then(create => res.json(create));
})

// update a day
router.put('/', (req, res, next) => {
    
})

// delete a day
router.delete('/:number', (req, res, next) => {
    Day.destroy({
        where: {
            number: req.params.number
        }
    }).then(value => res.json(value))
    .catch(next);
})


module.exports = router;
