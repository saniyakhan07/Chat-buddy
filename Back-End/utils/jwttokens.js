import jwt from "jsonwebtoken"

const generateTokenAndSetCookie = (userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET_KEY,{expiresIn:"15d"})

    res.cookie("jwt",token,{
        httpOnly:true,
        maxAge:1*24*60*60*1000,
        sameSite: "none",  // prevent csrf attacks & cross-site request forgery attacks
        httpOnly: true, // prevent xss attacks & cross-site scripting attacks
        secure: true,
    })
}

export default generateTokenAndSetCookie