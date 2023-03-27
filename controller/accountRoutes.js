const express = require('express');
const app = express();
const resetTokens = require('../model/resetTokens');
const user = require('../model/user');
const bcryptjs = require('bcryptjs');
const crypto = require('crypto');
const mailer = require('./sendMail');
const mainRoutes = require('./mainRoutes');

function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0');
        next();
    } else {
        req.flash('error_messages', "Please Login to continue !");
        res.redirect('/login');
    }
}

app.get('/user/forgot-password', async (req, res) => {
    res.render('forgot-password.ejs', { csrfToken: req.csrfToken() });
});

app.post('/user/forgot-password', async (req, res) => {
    const email = req.body.email;
    var userData = await user.findOne({ email: email });
    if (userData) {
        if (userData.provider == 'google') {
            // res.redirect('forgot-password.ejs', { csrfToken: req.csrfToken(), msg: "User exists with Google account. Try resetting your google account password or logging using it.", type: 'danger' });
            req.flash('error_messages', "User exists with Google account. Try resetting your google account password or logging using it");
            res.redirect('/login');
        }
        else {
            var token = crypto.randomBytes(32).toString('hex');
            await resetTokens({ token: token, email: email }).save();
            mailer.sendResetEmail(email, token);
            res.render('forgot-password.ejs', { csrfToken: req.csrfToken(), msg: "Reset email sent. Check your email for more info.", type: 'success' });
        }
    } else {
        res.render('forgot-password.ejs', { csrfToken: req.csrfToken(), msg: "No user Exists with this email.", type: 'danger' });

    }
})

app.get('/user/reset-password', async (req, res) => {

    const token = req.query.token;
    if (token) {
        var check = await resetTokens.findOne({ token: token });
        if (check) {
            res.render('forgot-password.ejs', { csrfToken: req.csrfToken(), reset: true, email: check.email });
        } else {
            res.render('forgot-password.ejs', { csrfToken: req.csrfToken(), msg: "Token Tampered or Expired.", type: 'danger' });
        }
    } else {
        res.redirect('/login');
    }

});


app.post('/user/reset-password', async (req, res) => {
    const { password, password2, email } = req.body;
    console.log(password);
    console.log(password2);
    if (!password || !password2 || (password2 != password)) {
        res.render('forgot-password.ejs', { csrfToken: req.csrfToken(), reset: true, err: "Passwords Don't Match !", email: email });
    } else {
        var salt = await bcryptjs.genSalt(12);
        if (salt) {
            var hash = await bcryptjs.hash(password, salt);
            await user.findOneAndUpdate({ email: email }, { $set: { password: hash } });
            res.redirect('/login');
        } else {
            res.render('forgot-password.ejs', { csrfToken: req.csrfToken(), reset: true, err: "Unexpected Error Try Again", email: email });

        }
    }
});

app.use(mainRoutes);

module.exports = app;