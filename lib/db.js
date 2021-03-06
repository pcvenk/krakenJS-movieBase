var mongoose = require('mongoose');

var db = function(){
    return {
        config: function(config){
            mongoose.connect('mongodb://localhost/moviebase');
            var db = mongoose.connection;
            db.on('error', console.log.bind(console, 'Connection Error'));
            db.once('open', function(){
                console.log('Connection established');
            })
        }
    }
};

module.exports = db();
