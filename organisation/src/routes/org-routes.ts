import { BadRequestError, natsWrapper } from "@otsoftstool/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { OrganisationsPublisher } from "../events/organisation-created-publisher";
import { Organisation } from "../models/organisation";
const router = express.Router();

router.post(
  "/api/organisation/create",
  [
    body("name")
      .trim()
      .not()
      .isEmpty()
      .isLength({ min: 4, max: 6 })
      .withMessage("Please Provide a Valid Organisation"),
  ],
  async (req: Request, res: Response) => {
    const { name } = req.body;

    const found = await Organisation.findOne({ name });
    if (found) {
      throw new BadRequestError("Organisation already in exists");
    }

    const org = await Organisation.build({ name });
    await org.save();

    new OrganisationsPublisher(natsWrapper.client).publish({
      id: org.id,
      name: org.name,
    });

    res.status(201).send(org);
  }
);

router.get("/api/organisation/list", (req: Request, res: Response) => {});

router.get("/api/organisation/detail/:id", (req: Request, res: Response) => {});

router.patch("/api/organisation/edit/:id", (req: Request, res: Response) => {});

export { router as organisationRouter };
