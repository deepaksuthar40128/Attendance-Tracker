const user = require('../model/users');
const bcryptjs = require('bcryptjs');
var localStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
    passport.use(new localStrategy({ usernameField: 'email' }, (email, password, done) => {
        user.findOne({ email: email }, (err, data) => {
            if (err) throw err;
            console.log(data);
            if (!data) {
                return done(null, false, { message: "user not exits" });
            }
            // bcryptjs.compare(password, data.password, (err, match) => {
            //     if (err) {
            //         return done(null, false);
            //     }
            //     if (!match) {
            //         return done(null, false, { message: "password not match" });
            //     }
            //     if (match) {
            //         return done(null, data);
            //     }
            // })
            if (password == data.password) {
                return done(null, data);
            }
            else {
                return done(null, false, { message: "password not match" });
            }

        })
    }));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        user.findById(id, function (err, user) {
            done(err, user);
        });
    });

}