import mongoose from "mongoose";
import app from "./app";

import { natsWrapper } from "@otsoftstool/common";

const start = async () => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error("JWT KEY is not provided");
    }
    await natsWrapper.connect("micro", "test", "http://nats-srv:4222");
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());
    await mongoose.connect(
      "mongodb://organisation-mongo-srv: 27017/organisation",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
  } catch (error) {
    console.log(error);
  }

  app.listen(3000, () => console.log("Listening on Port 3000!!"));
};

start();
