const express = require('express');
const passport = require('passport');
const users = require('../model/users');
const bcryptjs = require('bcryptjs');
const app = express();
require('./passportLocal')(passport);
require('./googleAuth')(passport);
require('./facebookAuth')(passport);
const userRoutes = require('./accountRoutes');

function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0');
        next();
    } else {
        req.flash('error_messages', "Please Login to continue !");
        res.redirect('/login');
    }
}

app.get('/', (req, res) => {
<<<<<<< HEAD
    if (req.isAuthenticated()) {
        res.render("base", { logged: true });
    } else {
        res.render("base", { logged: false });
    }
    // res.render('login')
})
app.get('/login', (req, res) => {
    res.render("login", { csrfToken: req.csrfToken() });
=======
    // if (req.isAuthenticated()) {
    //     res.render("base", { logged: true });
    // } else {
    //     res.render("base", { logged: false });
    // }
    res.render('home')
>>>>>>> bb4df415d54a9b0ae9a4dee4af3d6e0307f566ea
})

app.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/',
        failureFlash: true,
    })(req, res, next);
})

app.get('/logout', (req, res) => {
    req.logout(function (err) {
        req.session.destroy(function (err) {
            res.redirect('/');
        });
    });
});

app.get('/profile', checkAuth, (req, res) => {
        res.render('profile', { username: req.user.username, userprofile: req.user.profile, verified: req.user.isVerified, csrfToken: req.csrfToken() });
})

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email',] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/profile?mode=day');
})

app.use(userRoutes);

module.exports = app;