'use strict';

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

    return mongoose.model('Movie', movieSchema);

};

module.exports = moviesModel();
