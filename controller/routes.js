const express = require('express');
const passport = require('passport');
const users = require('../model/users');

const app = express();
require('./passportLocal')(passport);
require('./googleAuth')(passport);
// const userRoutes = require('./accountRoutes');
const addStudent = require('../portal/addStudent');

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

    if (req.isAuthenticated()) {
        res.render("base", { logged: true });
    } else {
        res.render("base", { logged: false });
    }
})

app.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/home',
        failureFlash: true,
    })(req, res, next);
})

app.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/logout');
    }
    else
        res.render('login');
})

app.get('/logout', (req, res) => {
    req.logout(function (err) {
        req.session.destroy(function (err) {
            res.redirect('/login');
        });
    });
});

app.get('/profile', (req,res) =>{
    res.render('profile');
})

app.get('/home', checkAuth, (req, res) => {
    if (req.user.role == "teacher")
        res.render('profHome', { username: req.user.username});
    else
        res.render('home', { username: req.user.username});
})

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email',] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login', failureFlash: true }), (req, res) => {
    console.log(req.user);
    res.redirect('/home');
})

// app.use(userRoutes);
app.use(addStudent);

module.exports = app;