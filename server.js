// set up ======================================================================
var express  = require('express');
var app      = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb
var port  	 = process.env.PORT || 3000; 				// set the port
var database = require('./config/database'); 			// load the database config
var mailer   = require('express-mailer');
var passport = require('passport');
var flash    = require('connect-flash');
// configuration ===============================================================
// mongoose.connect(database.url); 	// connect to mongoDB database on modulus.io

require('./config/passport')(passport); // pass passport for configuration

app.configure(function() {
	app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
	app.use(express.logger('dev')); 						// log every request to the console
  app.use(express.cookieParser()); // read cookies (needed for auth)
	app.use(express.bodyParser()); 							// pull information from html in POST
	app.use(express.methodOverride()); 						// simulate DELETE and PUT
  app.set('views', __dirname + '/app/views');
  app.set('view engine', 'ejs');

  // required for passport
  app.use(express.session({ secret: 'thereisnosecret' })); // session secret
  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions
  app.use(flash()); // use connect-flash for flash messages stored in session
});

require('./app/routes.js')(app, passport);

mailer.extend(app, {
  from: 'adhira.vriddhi@gmail.com',
  host: 'smtp.gmail.com', // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: 'adhira.vriddhi@gmail.com',
    pass: 'humility64'
  }
});
// routes ======================================================================

var quotes = [
  { author : 'Audrey Hepburn', text : "Nothing is impossible, the word itself says 'I'm possible'!"},
  { author : 'Walt Disney', text : "You may not realize it when it happens, but a kick in the teeth may be the best thing in the world for you"},
  { author : 'Unknown', text : "Even the greatest was once a beginner. Don't be afraid to take that first step."},
  { author : 'Neale Donald Walsch', text : "You are afraid to die, and you're afraid to live. What a way to exist."}
];

app.get('/formhandler', function(req,res){
  //  
    res.json(quotes);
});
// app.get('/formhandler/inversions', function(req,res){
//   // var id = Math.floor(Math.random() * quotes.length);
//   // var q = quotes[id];
//   res.json('this is correct');
// });
app.get('/formhandler/:id', function(req,res,next){
    var bookAttempt = req.params.id;
  app.mailer.send('email', {
    to: 'adhira.vriddhi@gmail.com', // REQUIRED. This can be a comma delimited string just like a normal email to field. 
    subject: bookAttempt , // REQUIRED.
    otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables.
  }, function (err) {
    if (err) {
      // handle error
      console.log('this is an '+err);
      res.send('There was an error sending the email');
      return;
    }
    if(req.params.id == 'shksfahkfjlsakjflkjfdslk') {
      console.log(bookAttempt);
      return res.send({answer:'correct',url:'images/views/afkljs.png'});
    } else if (req.params.id == 'the reproduction of daily life') {
      console.log(bookAttempt);
      return res.send({answer:'correct',url:'images/views/ksjdfhlaskdhflkjas.jpg'});
    } else {
      return res.send({answer:'incorrect',url:'something else',attempt:bookAttempt});
    }
  });
  // return res.send('Error 404: No quote found');
  // }  
  // var q = quotes[req.params.id];
  // res.json(q);
});






// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
