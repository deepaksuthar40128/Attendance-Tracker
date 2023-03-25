const FacebookStrategy = require('passport-facebook').Strategy;
const user = require('../model/user');

module.exports = function (passport) {
    passport.use(new FacebookStrategy({
        clientID: process.env.FacebookclientId,
        clientSecret: process.env.FacebookclientSecreT,
        callbackURL: "http://localhost/facebook/callback"
    }, (accessToken, refreshToken, profile, done) => {
        console.log(profile.emails[0].value);
        user.findOne({ email: profile.emails[0].value }).then((data) => {
            if (data) {
                return done(null, data);
            }
            else {
                user({
                    username: profile.displayName,
                    email: profile.emails[0].value,
                    facebookId: profile.id,
                    googleId: null,
                    password: null,
                    provider: 'facebook',
                    isVerified: true,
                }).save(function (err, data) {
                    return done(null, data);
                });
            }
        })
    }
    ));


    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        user.findById(id, function (err, user) {
            done(err, user);
        });
    });
}


