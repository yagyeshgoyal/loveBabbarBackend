// step1 => create a folder
// step2 => move into that folder
// step3 => in terminal -> npm init -y
// step4 => open folder using VScode
// step5 => npm i express
// step6 => create server.js
// step7 => to stablished mongodb and express -> npm i mongoose

//server Instantiate
const express = require('express');
const app = express();

// used to parese req.body in express -> PUT and POST
const bodyParser = require('body-parser');

// specifically parse JSON data & add it to the request.Body object
app.use(bodyParser.json());

// activate the server on 3000 port
app.listen(3000, ()=>{
    console.log("server started at port no. 3000 ");
})


// Routes
app.get('/', (request, response)=>{
    response.send("hello jee,");
})

app.post('/api/cars', (request,response)=>{
    const {name,brand} = request.body;
    console.log(name);
    console.log(brand);
    response.send("Car Submitted Successfully.");
})

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myDatabsse', {
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(()=>{console.log("connect successful")})
.catch((error)=>{console.log("Receive an error")})