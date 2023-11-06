const userRouter = require("./UserRoutes");
const postRouter = require("./PostRouters");
const notificationRouter = require("./NotificationRouters");
const friendRouter = require("./FriendRoutes");
const followingRouter = require("./FollowingRouters");

const apiRouter = require("express").Router();

apiRouter.use("/users", userRouter);
apiRouter.use("/posts", postRouter);
apiRouter.use("/notifications", notificationRouter);
apiRouter.use("/friends", friendRouter);
apiRouter.use("/followings", followingRouter);

module.exports = apiRouter;