import { User } from "../models/user.model.js";

export const getUserForSidebar = async(req,res)=>{
    try {
        const loggedInUserId = req.userid
        
        if(!loggedInUserId){
            return res.status(404).json({error:"not logged in user"})
        }
        const allUser = await User.find({_id:{$ne:loggedInUserId}});
        res.status(200).json(allUser);
    } catch (error) {
        return res.status(401).json({error:"sidedbar catch issue"})
    }
    //do it
}