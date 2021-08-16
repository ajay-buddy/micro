import mongoose, { version } from "mongoose";

interface OrganisationAttrs {
  name: string;
}

interface OrganisationDoc extends mongoose.Document {
  name: string;
}

interface OrganisationModel extends mongoose.Model<OrganisationDoc> {
  build(attrs: OrganisationAttrs): OrganisationDoc;
}

const organisationSchema = new mongoose.Schema<OrganisationDoc>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

organisationSchema.statics.build = (attrs: OrganisationAttrs) => {
  return new Organisation(attrs);
};

const Organisation = mongoose.model<OrganisationDoc, OrganisationModel>(
  "Organisation",
  organisationSchema
);

export { Organisation };
