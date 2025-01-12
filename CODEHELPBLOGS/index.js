const express  = require('express');
const app  = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

// mildware
app.use(express.json());

// import route
const blog = require("./routes/blog");

// mount
app.use("/yogi/v1", blog);

app.listen(PORT,()=>{
    console.log(`Successfully listen at port ${PORT}`);
})



// connect to the database
const dbConnect = require("./config/database");
dbConnect();


app.get("/", (req,res)=>{
    res.send("This is home page");
})