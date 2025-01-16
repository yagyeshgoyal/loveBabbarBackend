const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }

});

// post middleware
fileSchema.post("save", async function(doc){
    try{
        console.log("DOC", doc)
        // transporter
        let transporter = nodemailer.createTransport({
            host : process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
        })

        // send mail
        let info = await transporter.sendMail({
            from:`CodeHelp`,
            to:doc.email,
            subject: "new file uploaded on cloudinary",
            html: `<h2> Heloow jee </h2> <p>file uploaded  View here : <a href = "${doc.imageUrl}">${doc.imageUrl}</a> </p>`, 
        })

        console.log("INFO->", info);
    }
    catch(error){
        console.error(error);
    }
})


const File = mongoose.model("File",fileSchema);
module.exports = File;