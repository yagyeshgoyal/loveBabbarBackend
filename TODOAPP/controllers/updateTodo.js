// import the model
const Todo = require("../models/Todo");
const { getTodo } = require("./getTodo");

// define route handler

exports.updateTodo = async(req,res) => {
    try {
        // extract title and dexcription from request body
        const {title,description} = req.body;

        // extract todo items basis on id
        const {id} = req.params;


        const todo= await Todo.findByIdAndUpdate(
            {_id : id},
            {title, description, updateAt: Date.now()},        );

        res.status(200).json({
            success:true,
            data:todo,
            message:`update sucesfully`
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