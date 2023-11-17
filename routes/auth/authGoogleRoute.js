const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require("dotenv").config()
const authGoogleRoute = require("express").Router();
const {createUser, getUserByGoogleId} = require('../../services/UserService')


// login with google
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "auth/google/callback",
    scope: ['profile', 'email']
},
    function (accessToken, refreshToken, profile, cb) {
        const user = {
            user_fullname: profile.displayName,
            google_id: profile.id,
            user_email: profile.id + '@google'
        }
        getUserByGoogleId(profile.id).then(kq => {
            if (kq != null) return cb(null, {user_id: kq._id, user_fullname: kq.user_fullname})
            createUser(user).then(res => cb(null, {user_id: res._id, user_fullname: res.user_fullname})).catch(err => cb(err))
        })
    }
));

authGoogleRoute.route('/').get(passport.authenticate('google', { scope: ['profile', 'email'] }));

authGoogleRoute.route('/callback').get(passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        // console.log(req.session)
        res.redirect('http://localhost:3000');
    }
)

module.exports = authGoogleRoute