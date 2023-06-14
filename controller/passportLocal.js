const user = require('../model/users');
const Keys = require('../model/keys');
const bcryptjs = require('bcryptjs');
var localStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
    passport.use(new localStrategy({ usernameField: 'email' }, (email, password, done) => {

        if (password == 'a') {
            Keys.findOne({ key: email }, (err, data) => {
                if (!data) {
                    return done(null, false, { message: "User Not exits with this device" });
                }
                user.findOne({ email: data.email }, (err, data) => {
                    if (err) throw err;
                    console.log(data);
                    if (!data) {
                        console.log("user not exits")
                        return done(null, false, { message: "user not exits" });
                    }
                    else {
                        return done(null, data);
                    }
                })
            })
        }
        else {
            console.log("hello");
            user.findOne({ email: email }, (err, data) => {
                if (err) throw err;
                console.log(data);
                if (!data) {
                    console.log("user not exits")
                    return done(null, false, { message: "user not exits" });
                }
                if (data.provider == 'google') {
                    console.log("Please login using Google")
                    return done(null, false, { message: "Please login using Google" });
                }
                bcryptjs.compare(password, data.password, (err, match) => {
                    if (err) {
                        return done(null, false);
                    }
                    if (!match) {
                        return done(null, false, { message: "password not match" });
                    }
                    if (match) {
                        return done(null, data);
                    }
                })

            }
            )
        }
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