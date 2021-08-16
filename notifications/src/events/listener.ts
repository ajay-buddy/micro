import nats from "node-nats-streaming";
import { randomBytes } from "crypto";
import { OrganisationsListener } from "./organisation-created-listener";

console.clear();

const stan = nats.connect("micro", randomBytes(4).toString("hex"), {
  url: "http:localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  stan.on("close", () => {
    console.log("NATS connection closed!");
    process.exit();
  });
  process.on("SIGINT", () => stan.close());
  process.on("SIGTERM", () => stan.close());
  new OrganisationsListener(stan).listen();
});
