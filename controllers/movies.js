'use strict';

var Movie = require('../models/movies');


module.exports = function (router) {

    var model = new Movie();

    router.get('/', function (req, res) {


        res.render('movies', model);


    });

};
