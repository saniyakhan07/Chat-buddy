import mongoose, { Schema } from "mongoose";

const conversationSchema = new Schema({
    participants: [
        { 
         type: Schema.Types.ObjectId,
         ref: "User" 
        }
    ],
    message:[
        {
            type:Schema.Types.ObjectId,
            ref:"Message",
            default:[]
        }
    ]
},{timestamps:true})

export const Conversation = mongoose.model("Conversation",conversationSchema);