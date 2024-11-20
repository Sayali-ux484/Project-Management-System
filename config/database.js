import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const mongoUri = "mongodb+srv://nodevember:nodevember@cluster0.ov4y1.mongodb.net/PracticalSystem";
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("Connection failed", error);
  }
};

export default dbConnect;
