const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
const authRouters = require("express").Router();
require("dotenv").config()


// login with google
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback",
    scope: ['profile', 'email']
},
    function (accessToken, refreshToken, profile, cb) {
        console.log(accessToken)
        console.log(refreshToken)
        console.log(profile)
        console.log(cb)
        cb(null, 'userGoogle')
    }
));

authRouters.route('/google').get(passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouters.route('/google/callback').get(passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        console.log(req.session)
        res.redirect('http://localhost:3000');
    }
)


passport.serializeUser(function (user, cb) {
    console.log(cb)
    console.log(user)
    process.nextTick(function () {
        cb(null, user);
    });
});

passport.deserializeUser(function (user, cb) {
    console.log(cb)
    console.log(user)
    process.nextTick(function () {
        return cb(null, user);
    });
});
// end login with google

// login with facebook
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:8080/auth/facebook/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        console.log(accessToken)
        console.log(refreshToken)
        console.log(profile)
        console.log(cb)
        cb(null, 'userFacebook')
    }
));
authRouters.route('/facebook').get(passport.authenticate('facebook'));
authRouters.route('/facebook/callback').get(passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        console.log(req.session)
        res.redirect('http://localhost:3000');
    })

// end login with facebook

module.exports = authRouters