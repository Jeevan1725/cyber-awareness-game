import mongoose from "mongoose";

const connectDB = async () => {
  try {

    const connUri = process.env.MONGODB_URI || "mongodb://localhost:27017/cyberverse";
    await mongoose.connect(connUri);
    console.log("MongoDB Connected");

  } catch (error) {

    console.error("MongoDB connection failed:", error.message);
    // Don't exit process for testing
    // process.exit(1);

  }
};

export default connectDB;