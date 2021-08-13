import { natsWrapper } from "@otsoftstool/common";
import { OrganisationsListener } from "./events/organisation-created-listener";

const start = async () => {
  try {
    await natsWrapper.connect("micro", "test1", "http://nats-srv:4222");
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    new OrganisationsListener(natsWrapper.client).listen();
  } catch (error) {
    console.log(error);
  }
};

start();
