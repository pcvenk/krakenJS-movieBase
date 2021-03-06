'use strict';
var mongoose = require('mongoose');
var searchPlugin = require('mongoose-search-plugin');

var moviesModel = function(){
    //defining a new schema
    var movieSchema = mongoose.Schema({
        title: String,
        genre: String,
        plot: String,
        director: String,
        releaseDate: Date,
        trailer: String,
        cover: String
    });

    movieSchema.plugin(searchPlugin, {
        fields: ['title', 'plot', 'cover']
    });

    return mongoose.model('Movie', movieSchema);

};

module.exports = moviesModel();



