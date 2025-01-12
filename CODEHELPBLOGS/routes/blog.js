const express = require("express");
const router = express.Router();

// import controller

const {dummypage,likePost, unlikePost} = require("../controllers/LikeController");
const {createComment} = require("../controllers/CommentController");
const {createPost} = require("../controllers/PostController");
const {getAllPost} = require("../controllers/PostController");


// create mapping 
router.get("/dummyroute",dummypage);
router.post("/comment/create",createComment);
router.post("/posts/create",createPost);
router.get("/allposts",getAllPost);
router.post("/likepost",likePost);
router.post("/unlikepost",unlikePost);



// export
module.exports = router;

