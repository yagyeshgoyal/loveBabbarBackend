// import the model
const Todo = require("../models/Todo");
const { getTodo } = require("./getTodo");

// define route handler

exports.deleteTodo = async(req,res) => {
    try {
        

        // extract todo items basis on id
        const {id} = req.params;


        await Todo.findByIdAndDelete(id);

        res.json({
            success:true,
            message:`Deleted sucesfully`
        })

    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500)
        .json({
            success:false,
            data: "internal server error",
            message:err.message,
        })
    }
}