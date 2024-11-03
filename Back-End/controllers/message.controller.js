import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.userid;
   
    
    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });
   // console.log(conversation);
    
    // Create new conversation if none exists
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: [], // Ensure messages field exists
      });
    }

    // Create and save the new message
    const newMessage = await Message.create({
      senderId,
      recieverId:receiverId,
      message,
    });
    conversation.message.push(newMessage._id);

    // Save both the message and the conversation
    await Promise.all([newMessage.save(), conversation.save()]);

    const recieverSockedId = getReceiverSocketId(receiverId);
    if(recieverSockedId){
      io.to(recieverSockedId).emit('newMessage', newMessage);
    }

    return res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const getMessage = async (req, res) => {
  try {
    const { id: userToChat } = req.params;
    const senderId = req.userid; 

    if (!senderId) {
      return res.status(400).json({ error: "Sender ID missing." });
    }

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChat] },
    }).populate("message");


    if (!conversation) {
      return res.status(200).json([]);
    }

    return res.status(200).json(conversation.message);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};