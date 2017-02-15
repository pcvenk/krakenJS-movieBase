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

    //Add Moive POST
    router.post('/add', function(req, res){
        req.checkBody('title', 'Title is a required field').notEmpty();

        var errors = req.validationErrors();

        if(errors){
            console.log("Error");
        } else {
            console.log('No error');
        }
    });

};
