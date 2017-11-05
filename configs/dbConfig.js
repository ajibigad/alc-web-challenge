require('dotenv').load();

//DB SETUP
var mongoose = require('mongoose');

dbConfig = {
    configure: function() {
        var dbURL = "";
        if (process.env.APP_CONFIG && process.env.NODE_ENV == 'production') {
            var mongoPassword = process.env.MONGO_PASS;
            var config = JSON.parse(process.env.APP_CONFIG);
            dbURL = "mongodb://" + config.mongo.user + ":" +
                encodeURIComponent(mongoPassword) + "@" +
                config.mongo.hostString;
        } else {
            dbURL = "mongodb://localhost/alc";
        }

        var dbOptions = {
            useMongoClient: true
        };

        mongoose.connect(dbURL, dbOptions);
        mongoose.Promise = global.Promise;

        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'db connection error:'));
        db.on('connected', function() {
            console.log('Successfully connected to alc db');
        });
    }
}


module.exports = dbConfig;