
// Dependencies
// -----------------------------------------------------
var express         = require('express');
var mongoose        = require('mongoose');
var port            = process.env.PORT || 3000;
var morgan          = require('morgan');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var cookieParser    = require('cookie-parser');
var session         = require('express-session');
var passport        = require('passport');
require('./app/passport')(passport);
var app             = express();

// Express Configuration
// -----------------------------------------------------
// Sets the connection to MongoDB
mongoose.connect("mongodb://localhost/MapApp");

// Logging and Parsing
app.use(express.static(__dirname + '/public'));                 // sets the static files location to public
app.use('/bower_components',  express.static(__dirname + '/bower_components')); // Use BowerComponents
app.set('views','/public/views');
app.set('view engine','html');	
app.use(morgan('dev'));                                         // log with Morgan
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.urlencoded({extended: true}));               // parse application/x-www-form-urlencoded
app.use(bodyParser.text());                                     // allows bodyParser to look at raw text
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));  // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cookieParser()); 
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Routes
// ------------------------------------------------------
require('./app/routes.js')(app,passport);

// Listen
// -------------------------------------------------------
app.listen(port);
console.log('App listening on port ' + port);
