import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import userModel from '../models/userModel.js';
import 'dotenv/config.js';
  // User Login

const loginUser = async (req,res)=>{
  const {email , password} = req.body;
   try {
     const user =  await userModel.findOne({email});
     if (!user){
        return res.json({success:false, message:'User does not exist'});
     }
     const isMatch = await bcrypt.compare(password, user.password);
     if (!isMatch){
        return res.json({success:false, message:'Invalid credentials'});
     }
     const token =  createToken(user._id);
     res.json({success:true, token});
   } catch (error) {
    console.log(error);
    res.json({success:false, message:'Internal server error'})
   }
}

 const  createToken =  (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET )
 }




 // User Regestration
const registerUser = async (req,res)=>{
     const {name ,email , password} = req.body;
     try {

        // Checking is User Already Exist or Not
        const exist = await userModel.findOne({email});
        if (exist){
            return res.json({success:false, message:'User already exists'})
        }
        // Validate email format & strong password
        if(!validator.isEmail(email)){
            return res.json({success:false, message:'Invalid email format'})
        }
        if(password.length <8){
            return res.json({success:false, message:'Password must be at least 8 characters long'});
        }

        // Hashing User Password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name : name,
            email : email,
            password : hashedPassword
        });
        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success:true,token})
     } catch (error) {
        console.log(error);
        res.json({success:false, message:'Internal server error'})
     }
}



export {loginUser,registerUser};