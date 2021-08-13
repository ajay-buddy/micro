import { OrganisationsPublisher } from "./organisation-created-publisher";
import nats from "node-nats-streaming";

console.clear();

const stan = nats.connect("micro", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", async () => {
  console.log("Publisher connected to NATS");

  const publisher = new OrganisationsPublisher(stan);
  try {
    await publisher.publish({
      id: "test",
      name: "name",
    });
  } catch (err) {
    console.log("Error: ", err);
  }
});
