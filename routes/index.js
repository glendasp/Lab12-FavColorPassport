var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  //Redirecting the homepage to the signup page.
  res.redirect('/signup');
});

//Get signup page
router.get('/signup', function(req, res, next ){
  res.render('signup', {message: req.flash('signupMessage')})
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/secret',
  failureRedirect: '/signup',
  failureFlash: true
}));


router.get('/secret', isLoggedIn, function(req,res, next){
  res.render('secret', {user: req.user});
});

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}

//Get login page
router.get('/login', function (req, res, next) {
  res.render('login', {message: req.flash('loginMessage',{
    successRedirect: '/secret',
    failureRedirect: '/loing',
    failureFlash: true
  })});

  /* GET Logout */
  router.get('/logout', function(req, res, next) {
    req.logout();         //passport middleware adds these functions to req.
    res.redirect('/');
  });
});

router.post('/loin', passport.authenticate('local-login'))

module.exports = router;
