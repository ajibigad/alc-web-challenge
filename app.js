var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var router = express.Router();

app.use(express.static('public'));

//VIEWS SETUP
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public');


//ROUTES
var StudentRouter = require('./routes/student');

require('./configs/dbConfig').configure();

//CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "PUT, DELETE");
    next();
});

app.get('/', function (req, res) {
    res.render('index');
});

var baseEndPoint = '/api/v1/alc';

app.use(baseEndPoint, router);
app.use(baseEndPoint + '/student', StudentRouter);

app.use(function(err, req, res, next) {
    console.error(err.stack);
    console.dir(err);
    res.status(500).json({ message: 'Error occured', error: err });
});

var port = process.env.PORT || 3001;
app.listen(port);
console.log("listening on port " + port);