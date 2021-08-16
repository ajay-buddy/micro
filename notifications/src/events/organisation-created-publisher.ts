import nats, { Message, Stan } from "node-nats-streaming";
import {
  Publisher,
  QueueGroupName,
  Subjects,
  OrganisationCreatedInterface,
} from "@otsoftstool/common";

export class OrganisationsPublisher extends Publisher<OrganisationCreatedInterface> {
  readonly subject: Subjects.OrganisationCreated = Subjects.OrganisationCreated;
  queueGroupName = QueueGroupName.Organisation;
}
