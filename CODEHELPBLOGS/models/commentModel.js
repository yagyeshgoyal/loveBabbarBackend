const mongoose = require("mongoose");

// route handler
const commentSchema = new mongoose.Schema({
    post:{
        type : mongoose.Schema.Types.ObjectId,
        ref: "Post", // reference to the post model
    },
    user:{
        type : String,
        require : true,
    },
    body:{
        type : String,
        require : true,
    }
});


// export
module.exports = mongoose.model("Comment", commentSchema);