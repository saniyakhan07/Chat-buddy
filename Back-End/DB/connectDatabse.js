import mongoose from "mongoose";

const connectToMongoDB = async()=>{
    try {
        await mongoose.connect(`mongodb+srv://saniyakhanjlp:nYsy04gByqO21Znx@chatbuddy.beojj.mongodb.net/?retryWrites=true&w=majority&appName=chatbuddy`);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to mongodb",error.message);
    }
}

export default connectToMongoDB