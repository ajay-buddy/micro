import { Subjects } from "../enums/subject";

export interface OrganisationCreatedInterface {
  subject: Subjects.OrganisationCreated;
  data: {
    id: string;
    name: string;
  };
}
