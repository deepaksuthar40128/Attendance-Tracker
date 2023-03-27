const express = require('express');
const passport = require('passport');
// const user = require('../model/user');
const bcryptjs = require('bcryptjs');
const app = express();
// require('./passportLocal')(passport);
// require('./googleAuth')(passport);
// require('./facebookAuth')(passport);
// const userRoutes = require('./accountRoutes');

// function checkAuth(req, res, next) {
//     if (req.isAuthenticated()) {
//         res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0');
//         next();
//     } else {
//         req.flash('error_messages', "Please Login to continue !");
//         res.redirect('/login');
//     }
// }

app.get('/', (req, res) => {
    // if (req.isAuthenticated()) {
    //     res.render("base", { logged: true });
    // } else {
    //     res.render("base", { logged: false });
    // }
    res.render('home')
})
// app.get('/login', (req, res) => {
//     res.render("login", { csrfToken: req.csrfToken() });
// })

// app.get('/signup', (req, res) => {
//     res.render("signup", { csrfToken: req.csrfToken() });
// })

// app.post('/login', (req, res, next) => {
//     passport.authenticate('local', {
//         failureRedirect: '/login',
//         successRedirect: '/',
//         failureFlash: true,
//     })(req, res, next);
// })

// app.post('/signup', async (req, res) => {
//     let data = await user.findOne({ email: req.body.email });
//     if (data) {
//         res.render("signup", { err: "user already exist", csrfToken: req.csrfToken() });
//     }
//     else {
//         bcryptjs.genSalt(12, (err, salt) => {
//             if (err) throw err;
//             bcryptjs.hash(req.body.password, salt, async (err, hash) => {
//                 if (err) throw err;
//                 newData = new user({
//                     username: req.body.username,
//                     email: req.body.email,
//                     password: hash,
//                     profile: req.body.profile_link,
//                     facebookId: null,
//                     googleId: null,
//                     provider: 'email',
//                 })
//                 newData = await newData.save();
//                 res.redirect('/login');
//             })
//         });
//     }
// })

// app.get('/logout', (req, res) => {
//     req.logout(function (err) {
//         req.session.destroy(function (err) {
//             res.redirect('/');
//         });
//     });
// });

// app.get('/profile', checkAuth, (req, res) => {
//     mode = req.query.mode;
//     if (mode == 'day') {
//         res.render('profile2', { username: req.user.username, userprofile: req.user.profile, verified: req.user.isVerified, csrfToken: req.csrfToken() });
//     }
//     else {
//         res.render('profile', { username: req.user.username, userprofile: req.user.profile, verified: req.user.isVerified, csrfToken: req.csrfToken() });
//     }
// })

// app.get('/google', passport.authenticate('google', { scope: ['profile', 'email',] }));

// app.get('/facebook', passport.authenticate('facebook', { scope: ['user_friends', 'manage_pages'] }));

// app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
//     res.redirect('/profile?mode=day');
// })
// app.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
//     res.redirect('/profile?mode=day');
// })
// app.get('/help', (req, res) => {
//     res.render('help');
// })

// app.use(userRoutes);

module.exports = app;