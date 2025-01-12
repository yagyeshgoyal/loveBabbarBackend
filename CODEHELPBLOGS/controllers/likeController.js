
const Post = require("../models/postModel");
const Like = require("../models/likeModel");

exports.likePost = async (req,res) =>{
    try{
        // fetch data from req body
        const {post, user} = req.body;

        // create a comment object
        const like = new Like({post,user});

        // save the new comment into the database
        const savedLike  = await like.save();

        // find the postby ID, add the new commnet to its comments array
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {likes: savedLike._id}}, {new: true})
                            .populate('likes') // populate the coments array with comment documents
                            .exec();

        res.json({
            post : updatedPost,
        })
    }
    catch(error){
        return res.status(500).json({
            error: "Erron while like",
        });
    }
}


exports.unlikePost = async (req,res) =>{
    try{
        // fetch data from req body
        const {post, like} = req.body;

        const deleteLike = await Like.findOneAndDelete({post:post, _id:like});

        // find the postby ID, add the new commnet to its comments array
        const updatedPost = await Post.findByIdAndUpdate(post, {$pull: {likes: deleteLike._id}}, {new: true})
                            .populate('likes') // populate the coments array with comment documents
                            .exec();

        res.json({
            post : updatedPost,
        })
    }
    catch(error){
        return res.status(500).json({
            error: "Erron while like",
        });
    }
}


exports.dummypage = (req,res) =>{
    res.send("this is dummy route");
}