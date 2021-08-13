import mongoose from "mongoose";
import app from "./app";

const start = async () => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error("JWT KEY is not provided");
    }
    await mongoose.connect("mongodb://auth-mongo-srv: 27017/auth", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (err) {
    console.log(err);
  }

  app.listen(3000, () => console.log("Listening on Port 3000!!"));
};

start();
