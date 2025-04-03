import mongoose from "mongoose";
import { config } from "./app.config";

const connectDatabase = async (cb?: Function) => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("Connected to Mongo database");
    cb?.();
  } catch (error) {
    console.log("Error connecting to Mongo database");
    process.exit(1);
  }
};

export default connectDatabase;
