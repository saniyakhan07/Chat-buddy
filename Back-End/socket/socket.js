import { Server } from "socket.io";
import http from 'http';
import express from 'express';

 const app = express(); // Initialize app first

 const server = http.createServer(app); // Create server with app

 const io = new Server(server, {  // Pass 'server', not 'Server'
    cors: {
        origin: ["http://localhost:5173", "*"], // Your frontend's origin
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    }
});


export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};


const userSocketMap = {}

io.on('connection', (socket) => {
    console.log("A user connected:", socket.id);
    const userId = socket.handshake.query.userId;
    if(userId != "undefined") userSocketMap[userId]=socket.id;
    // io.emit() is used to send events to all connected clients
    io.emit("getOnlineUsers",Object.keys(userSocketMap));
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap))
    });
});

export {app,io,server}