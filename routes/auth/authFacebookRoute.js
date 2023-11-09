const passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
const authFacebookRoute = require("express").Router();
require("dotenv").config()

// login with facebook
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback",
    scope: ["user_hometown", "user_birthday", "user_gender", "public_profile"]
},
    function (accessToken, refreshToken, profile, cb) {

        cb(null, profile)
    }
));


authFacebookRoute.route('/').get(passport.authenticate('facebook'));
authFacebookRoute.route('/callback').get(passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        // console.log(req.session)
        res.redirect('/logined');
    })

module.exports = authFacebookRoute