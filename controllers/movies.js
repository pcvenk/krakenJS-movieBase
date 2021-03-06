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

    // Details Route
    router.get('/details/:id', function(req, res){
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

    // Delete Route
    router.delete('/delete/:id', function(req, res){
        var id = req.params.id;
        //pass in the query
        Movie.remove({_id: id}, function(err){
            if(err){
                res.send(err);
            }
            res.status(204).send();
        });
    });

    //Edit Route
    router.get('/edit/:id', function(req, res){
        var id = req.params.id;

        Movie.findOne({_id: id}, function(err, movie){
            if(err){
                res.send(err);
            } else {
                res.render('editmovie', {
                    movie: movie
                });
            }
        });
    });

    //Update Route
    router.post('/edit/:id', function(req, res){
        //checking if the required field has been input(express-validator)
        req.checkBody('title', 'Title is a required field').notEmpty();

        var id = req.params.id;
        var errors = req.validationErrors();

        if(errors){
            Movie.findOne({_id: id}, function(err, movie){
                if(err) {
                    res.send(err);
                } else {
                    res.render('editmovie', {
                        errors: errors,
                        movie: movie
                    });
                }
            })
        } else {
            //Retrieving values from the form
            var title = req.body.title && req.body.title.trim();
            var releaseDate = req.body.releaseDate && req.body.releaseDate.trim();
            var genre = req.body.genre && req.body.genre.trim();
            var director = req.body.director && req.body.director.trim();
            var plot = req.body.plot && req.body.plot.trim();
            var cover = req.body.cover && req.body.cover.trim();
            var trailer = req.body.trailer && req.body.trailer.trim();

            var updateMovie = {
                title: title,
                releaseDate: releaseDate,
                genre: genre,
                director: director,
                plot: plot,
                cover: cover,
                trailer: trailer
            };

            //Saving the edited movie
            Movie.update({_id: id}, updateMovie, function(err){
                if(err){
                    res.send(err)
                }
                res.redirect('/movies')
            })
        }
    });

    //Search Movies
    router.post('/search', function(req, res){
        Movie.search(req.body.searchMovies,
            {title: 1, plot: 1, cover: 1},
            {
                conditions: {
                    title: {$exists: true},
                    plot: {$exists: true},
                    cover: {$exists: true}
                },
                sort: {title: 1},
                limit: 10
            },
            function(err, movies){
                if(err){
                    res.send(err);
                } else {
                    var result =  {
                        movies: movies.results
                    };

                    res.render('movies', result);
                }
        });
    });

    //Filter Genre Route
    router.get('/genre/:genre', function(req, res){
        Movie.find({genre: req.params.genre}, function(err, films){
            if(err){
                res.send(err);
            } else {
                var model = {
                    movies: films
                };
                res.render('movies', model);
            }
        });
    });
};
