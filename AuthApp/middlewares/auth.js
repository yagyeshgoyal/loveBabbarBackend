// auth isStudent isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) =>{
    try{
        // extract JWT token
        // PENDING : other ways to fetch token
        const token = req.body.token;

        if(!token){
            return res.status(401).json({
                success:false,
                message:"token missing",
            });
        }

        // verify token
        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);
            req.user = payload;

        }
        catch(error){
            console.log(error);
            return res.status(401).json({
                success:false,
                message:"token is invalid",
            });
        }
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"something went wrong when verifying token",
        });
    }
}

exports.isStudent = (req,res,next)=>{
    try{
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success:false,
                message:'this is a protected route for student',
            });
        }
        next();

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'user role is not matching',
        });
    }
} 


exports.isAdmin = (req,res,next)=>{
    try{
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success:false,
                message:'this is a protected route for Admin',
            });
        }
        next();

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'user role is not matching',
        });
    }
}

