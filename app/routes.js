var User = require('./models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
module.exports = function(app,passport) {
   
//get home page

   app.get('/' , function(req,res){
   	res.render('index.ejs');
   });

//login

 app.get('/login' , function(req,res){
      res.render('login.ejs' ,{message: req.flash('loginMessage')
   });
});
//signup 


   app.get('/signup' , function(req,res){
  //  console.log('hii');
   	res.render('signup.ejs' ,{ message: req.flash('signupMessage')
   });
});

//profile

   app.get('/profile' ,function(req,res){
      res.render('profile.ejs' ,{ message: req.flash('updated')
   });
  });

   app.get('/home' ,isLoggedIn,function(req,res){
         res.render('home.ejs', {
          user: req.user
   });
 });        

   app.post('/signup', passport.authenticate('local-signup',
   { 
    successRedirect: '/home',
     failureRedirect: '/signup',
     failureFlash: 'true'
   }));

app.post('/login', passport.authenticate('local-login',
   { 
    successRedirect: '/signup',
     failureRedirect: '/login',
     failureFlash: 'true'
   }));
app.post('/profile' , function(req,res){
  consol.log()
})
};

function isLoggedIn (req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}