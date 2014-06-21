var http = require('http');
var querystring = require('querystring');
var utils = require('util');
var Todo = require('./models/todo');

module.exports = function(app, passport) {

  // api ---------------------------------------------------------------------
  // get all todos
  app.get('/api/todos', function(req, res) {

    // use mongoose to get all todos in the database
    Todo.find(function(err, todos) {

      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err)
        res.send(err)

      res.json(todos); // return all todos in JSON format
    });
  });

  // create todo and send back all todos after creation
  app.post('/api/todos', function(req, res) {
    console.log(req);
    // create a todo, information comes from AJAX request from Angular
    // Todo.create({
    //   text : req.body.text,
    //   done : false
    // }, function(err, todo) {
    //   if (err)
    //     res.send(err);

    //   // get and return all the todos after you create another
    //   Todo.find(function(err, todos) {
    //     if (err)
    //       res.send(err)
    //     res.json(todos);
    //   });
    // });

  });


  // delete a todo
  app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
      _id : req.params.todo_id
    }, function(err, todo) {
      if (err)
        res.send(err);

      // get and return all the todos after you create another
      Todo.find(function(err, todos) {
        if (err)
          res.send(err)
        res.json(todos);
      });
    });
  });

  // application -------------------------------------------------------------
  // app.get('/', function(req, res) {
  //   res.sendfile('../public/js/home.html'); // load the single view file (angular will handle the page changes on the front-end)
  // });

app.get('/partials/:name', function(req,res) {
    res.render('partials/' + req.params.name);
});



// app.get('/formhandler', function(req,res){

//     console.log("[200] " + req.method + " to " + req.url);
//     if (req.method == 'POST') {
//     console.log("[200] " + req.method + " to " + req.url);
//     var fullBody = '';
      
//     req.on('data', function(chunk) {
//       console.log("Received body data:");
//       console.log(chunk.toString());
//       fullBody += chunk.toString();
//     });
    
//     req.on('end', function() {
//       // empty 200 OK response for now
//       res.writeHead(200, "OK", {'Content-Type': 'text/html'});
//       // parse the received body data
//       var decodedBody = querystring.parse(fullBody);
 
//       // output the decoded data to the HTTP response          
//       res.write('<html><head><title>Post data</title></head><body><pre>');
//       res.write(utils.inspect(decodedBody));
//       res
//       res.end();
//     });
    
//   } else {
//     console.log("[405] " + req.method + " to " + req.url);
//     res.writeHead(405, "Method not supported", {'Content-Type': 'text/html'});
//     res.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
//   }
// });


  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================
  app.get('/', function(req, res) {
    res.render('game.ejs'); // load the index.ejs file
  });

  // =====================================
  // LOGIN ===============================
  // =====================================
  // show the login form
  app.get('/login', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('login.ejs', { message: req.flash('loginMessage') }); 
  });
  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));
  // process the login form
  // app.post('/login', do all our passport stuff here);

  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  app.get('/signup', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });
    // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  // process the signup form
  // app.post('/signup', do all our passport stuff here);

  // =====================================
  // PROFILE SECTION =====================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
      user : req.user // get the user out of session and pass to template
    });
  });

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

    // =====================================
  // HOME PAGE (with login links) ========
  // =====================================
  app.get('/game', function(req, res) {
    res.render('game.ejs'); // load the index.ejs file
  });

    // route for showing the profile page
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
      user : req.user // get the user out of session and pass to template
    });
  });

  // =====================================
  // FACEBOOK ROUTES =====================
  // =====================================
  // route for facebook authentication and login
  app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

  // handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect : '/profile',
      failureRedirect : '/'
    }));

  // route for logging out
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}


