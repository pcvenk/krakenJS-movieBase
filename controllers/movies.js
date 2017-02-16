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

    //Add Movie POST
    router.post('/add', function(req, res){
        //checking if the required field has been input
        req.checkBody('title', 'Title is a required field').notEmpty();

        var errors = req.validationErrors();

        if(errors){
            res.render('addMovies', {
                errors: errors
            });
        } else {

            //Retrieving values from the form
            var title = req.body.title && req.body.title.trim();
            var releaseDate = req.body.releaseDate && req.body.releaseDate.trim();
            var genre = req.body.genre && req.body.genre.trim();
            var director = req.body.director && req.body.director.trim();
            var plot = req.body.plot && req.body.plot.trim();
            var cover = req.body.cover && req.body.cover.trim();
            var trailer = req.body.trailer && req.body.trailer.trim();

            var newMovie = new Movie({
                title: title,
                releaseDate: releaseDate,
                genre: genre,
                director: director,
                plot: plot,
                cover: cover,
                trailer: trailer
            });

            //Saving a new movie
            newMovie.save(function(err){
                if(err){
                    res.send(err)
                }
                res.redirect('/movies')
            })
        }
    });

    //Details Route
    app.get('details/:id', function(req, res){
        var id = req.params.id;

        Movie.findOne({_id: id}, function(err, movie){
            if(err){
                console.log(err);
            } else {
                res.render('details', {
                   movie: movie
                })
            }
        });
    });

};
