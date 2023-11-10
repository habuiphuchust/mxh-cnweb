const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const {createUser, getUserByFacebookId} = require('../../services/UserService')
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
        const user = {
            user_fullname: profile.displayName,
            facebook_id: profile.id,
            user_email: profile.id + '@facebook'
        }
        getUserByFacebookId(profile.id).then(kq => {
            if (kq != null) return cb(null, {user_id: kq._id, user_fullname: kq.user_fullname})
            createUser(user).then(res => cb(null, {user_id: res._id, user_fullname: res.user_fullname})).catch(err => cb(err))
        })
        // console.log(profile);

    }
));


authFacebookRoute.route('/').get(passport.authenticate('facebook'));
authFacebookRoute.route('/callback').get(passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        // console.log(req.session)
        res.redirect('http://localhost:3000');
    })

module.exports = authFacebookRoute