import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { RequestValidationError } from "@otsoftstool/common";
import { validateRequest } from "@otsoftstool/common";
import { User } from "../models/users";
import { BadRequestError } from "@otsoftstool/common";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Please provide a valid Email"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 6 })
      .withMessage("Please Provide a Valid Password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const found = await User.findOne({ email });
    if (found) {
      throw new BadRequestError("Email already in use");
    }
    const user = await User.build({ email, password });
    await user.save();
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!
    );
    req.session = {
      jwt: token,
    };
    return res.status(201).send(user);
  }
);

export { router as signUpRouter };
