'use strict';

var Movie = require('../models/movies');


module.exports = function (router) {

    var model = new Movie();

    //Movielistings Route
    router.get('/', function (req, res) {
        //get all movies
        Movie.find({}, function(err, docs){
           if(err){
               res.send(err);
           } else {
               res.render('movies', {
                   movies: docs
               });
           }
        });

    });

    //Add Movie
    router.get('/add', function(req, res){
       res.render('addMovies');
    });

};
