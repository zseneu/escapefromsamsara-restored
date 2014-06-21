// set up ======================================================================
var express  = require('express');
var app      = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb
var port  	 = process.env.PORT || 3000; 				// set the port
var database = require('./config/database'); 			// load the database config

// configuration ===============================================================
// mongoose.connect(database.url); 	// connect to mongoDB database on modulus.io

app.configure(function() {
	app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
	app.use(express.logger('dev')); 						// log every request to the console
	app.use(express.bodyParser()); 							// pull information from html in POST
	app.use(express.methodOverride()); 						// simulate DELETE and PUT
});


// routes ======================================================================
app.use(express.bodyParser());
require('./app/routes.js')(app);
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
app.get('/formhandler/:id', function(req,res){
    var bookAttempt = req.params.id;
  if(req.params.id == 'inversions') {
    console.log(bookAttempt);
    return res.send({answer:'correct',url:'images/views/hdsfkjhaklhfsjafkljs.png'});
  } else {
    return res.send({answer:'incorrect',url:'something else',attempt:bookAttempt});
  }
  // return res.send('Error 404: No quote found');
  // }  
  // var q = quotes[req.params.id];
  // res.json(q);
});


// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
