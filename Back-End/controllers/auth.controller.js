import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import generateTokenAndSetCookie from "../utils/jwttokens.js";
export const signup = async(req,res)=>{
   try {
    
    const {fullname,username,password,confirmpassword,gender} = req.body;
   
    
    if(password!==confirmpassword){
        return res.status(400).json({error:"password don't match"})
    }
    const user = await User.findOne({username})

    if(user){
        return res.status(400).json({error:"username already exists"})
    }

    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password,salt);
    
    const newUser = new User({
        fullname,
        username,
        password:hashPassword,
        gender,
    })
    if(!newUser){
        return res.status(400).json({error:"new user was not created"})
    }
    await newUser.save();
    return res.status(200).json({message:"User created Successfully"});
   } catch (error) {
    return res.status(500).json({error:"Signup problem"})
   }
}

export const login = async(req,res)=>{
    try {
        const {username,password}=req.body
        const user = await User.findOne({username})
        if(!user){
            res.status(200).json({
                error:"username not found"
            })
           
        }    
        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            res.status(200).json({
               error:"password dont match"
            })
        }
        const returnuser = await User.findById(user._id).select("-password");
        generateTokenAndSetCookie (user._id,res);
        res.status(200).json(returnuser)

    } catch (error) {
        res.status(400,"login error catched")
    }
}

export const logout = (req,res)=>{
   try {
     res.clearCookie("jwt",{maxage:0});
     res.status(200).json({
        message:"logout successful"
     })
   } catch (error) {
    res.status(400,"logout Error")
   }
}