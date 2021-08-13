import nats, { Message, Stan } from "node-nats-streaming";
import {
  Listener,
  QueueGroupName,
  Subjects,
  OrganisationCreatedInterface,
} from "@otsoftstool/common";

import { organisationQueue } from "../queues/organisation-queue";
import { sendEmail } from "../send-email";

export class OrganisationsListener extends Listener<OrganisationCreatedInterface> {
  readonly subject: Subjects.OrganisationCreated = Subjects.OrganisationCreated;
  queueGroupName = QueueGroupName.Organisation;

  async onMessage(data: OrganisationCreatedInterface["data"], msg: Message) {
    console.log("Event Data");
    await organisationQueue.add(data);
    // await sendEmail();
    msg.ack();
  }
}
