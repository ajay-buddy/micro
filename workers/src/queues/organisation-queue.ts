import { Subjects } from "@otsoftstool/common";
import Queue from "bull";

interface Payload {
  id: string;
  name: string;
}

const organisationQueue = new Queue<Payload>(Subjects.OrganisationCreated, {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

organisationQueue.process(async (job) => {
  console.log("Organisation Queue: ", job, job.data.id, job.data.name);
});

export { organisationQueue };
