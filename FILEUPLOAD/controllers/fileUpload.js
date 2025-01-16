const File = require("../models/File");
const cloudinary = require("cloudinary").v2

// localfileupload -> hander function
exports.localFileUpload =async(req, res)=>{
    try{

        // fetch file
        const file = req.files.file;
        console.log("FILE AAGYI JEE -> ", file);

        let path = __dirname + "/files/" + Date.now() + "." +`${file.name.split('.')[1]}`;
        console.log("PATH->", path)

        file.mv(path,(err)=>{
            console.log(err);
        });
        res.json({
            success:true,
            message:"local file upload succesfully",
        });
    }
    catch(error){
        console.log(error);
    }
}

function isfileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality){
    const options = {folder}

    if(quality){
        options.quality = quality;
    }
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}

// image upload ka handler
exports.imageUpload = async(req,res) =>{
    try{
        // data fetch
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        // validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isfileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        // file format supported hai

        const response = await uploadFileToCloudinary(file, "codehelp");
        console.log(response);

        // db me entry save karni h
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })

        res.json({
            success : true,
            imageUrl: response.secure_url,
            message: "image successfully uploaded",
        })
    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"something went wrong",
        })
    }
}



// video upload ka handler

exports.videoUpload = async(req,res) =>{
    try{

        // data fetch
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.videoFile;
        console.log(file);

        // validation
        const supportedTypes = ["mp4", "mov","mkv"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type : ", fileType);

        // TODO : add a upper limit of 5MB Video
        if(!isfileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        // file format supported hai

        const response = await uploadFileToCloudinary(file, "codehelp");
        console.log(response);

        // db me entry save karni h
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })

        res.json({
            success : true,
            imageUrl: response.secure_url,
            message: "video successfully uploaded",
        })

    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"something went wrong",
        })
    }
}



// imageSizeReducer

exports.imageSizeReducer = async(req,res) =>{
    try{
        // data fetch
        const {name, tags, email} = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        // validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        // TODO : add  a upper limit of 5mb for image
        if(!isfileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File format not supported',
            })
        }

        // file format supported hai

        const response = await uploadFileToCloudinary(file, "codehelp", 30);
        console.log(response);

        // db me entry save karni h
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })

        res.json({
            success : true,
            imageUrl: response.secure_url,
            message: "image successfully uploaded",
        })
    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"something went wrong",
        })
    }
}
