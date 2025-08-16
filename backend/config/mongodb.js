import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("DB vesto connected");
  });

  await mongoose.connect(`${process.env.MONGODB_URI}/Vesto`);
};

export default connectDB;
