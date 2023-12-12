const express = require('express');
const router = express.Router();
const commentController = require('../controllers/CommentController');

router.post('/create-comment', commentController.createComment);
router.post('/delete-comment', commentController.deleteComment);
router.get('/get-comments/:post_id', commentController.getComments);
router.post('/create-comment-react', commentController.createCommentReact);
router.post('/delete-comment-react', commentController.deleteCommentReact);
router.get('/get-comment-react/:comment_id', commentController.getCommentReact);
router.get('/get-users-reacted/:comment_id', commentController.getUsersReacted);

module.exports = router;
