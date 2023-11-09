const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require("dotenv").config()
const authGoogleRoute = require("express").Router();

// login with google
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "auth/google/callback",
    scope: ['profile', 'email']
},
    function (accessToken, refreshToken, profile, cb) {

        cb(null, profile)
    }
));

authGoogleRoute.route('/').get(passport.authenticate('google', { scope: ['profile', 'email'] }));

authGoogleRoute.route('/callback').get(passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        console.log(req.session)
        res.redirect('/logined');
    }
)

module.exports = authGoogleRoute