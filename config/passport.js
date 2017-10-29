var LocalStrategy = require('passport-local').Strategy;
var User = require ('../app/models/user');
module.exports = function(passport) {


    passport.serializeUser(function(user, done) {
        console.log(user.id);//// Here is my testing alert
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });


passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, email, password, done) {
       process.nextTick(function() {
        User.findOne({ 'local.email' :  email }, function(err, user) {

            if (err)
                return done(err);

            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {
                var newUser            = new User();
                newUser.local.email    = email;
                newUser.local.password = newUser.generateHash(password);
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });    

        });

    }));

passport.use('local-login', new LocalStrategy({
	emailField: 'email',
	passwordField: 'password',
	passReqToCallBack: true
},function(req,email,password, done){
	process.nextTick(function(){
		User.findOne({'local.email': email}, function(err,user){
			if(err) return done(err);
			if(!user){
				console.log(req.flash);
				return done (null, false, req.flash('loginMessage','email does not exit'));
			}

			if(!user.validPassword(password)){
				return done(null,false,req.flash('loginMessage','password is not correct'));
			}

			return done(null, user);
			});
		});
	}));
};
