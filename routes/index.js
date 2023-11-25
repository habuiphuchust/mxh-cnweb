const express = require("express")
const userRouter = require("./UserRoutes");
const postRouter = require("./PostRouters");
const notificationRouter = require("./NotificationRouters");
const friendRouter = require("./FriendRoutes");
const followingRouter = require("./FollowingRouters");
const authRouters = require('./authRoutes');
const likeRouters = require('./LikeRouters')
const {signupRouter} = require('./Signup');
const ImageRoutes = require('./ImageRoutes')
//
const Router = express.Router()
const apiRouter = express.Router()

apiRouter.use("/users", userRouter);
apiRouter.use("/posts", postRouter);
apiRouter.use("/notifications", notificationRouter);
apiRouter.use("/friends", friendRouter);
apiRouter.use("/followings", followingRouter);
apiRouter.use('/images', ImageRoutes);
apiRouter.use('/likes', likeRouters)

Router.use('/api', apiRouter)
Router.use('/signup', signupRouter)
Router.use('/auth', authRouters)

Router.route('/logined').get((req, res) => {
    if (req.session?.passport?.user) {
        res.json({message: req.session.passport.user, status: 'success'})
    } else {
        res.json({message:'chưa đăng nhập', status: 'fail'})
    }
    
});
Router.route('/logout').get((req, res) => {
    req.session.destroy(err => {
        if (err) return res.json({message: err, status: "fail"})
        res.json({message: 'đăng xuất thành công', status: 'success'})
    })
})

module.exports = Router;

// const authRouter = require("express").Router();


