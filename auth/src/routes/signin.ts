import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "@otsoftstool/common";
import { validateRequest } from "@otsoftstool/common";
import { User } from "../models/users";
import { Password } from "../services/password";
import { BadRequestError } from "@otsoftstool/common";
const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Provide a valid Email"),
    body("password").trim().notEmpty().withMessage("Provide a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      throw new BadRequestError("Invalid Credentials");
    }
    const match = await Password.compare(foundUser.password, password);
    if (!match) {
      throw new BadRequestError("Invalid Credentials");
    }
    const token = jwt.sign(
      { id: foundUser.id, email: foundUser.email },
      process.env.JWT_KEY!
    );
    req.session = {
      jwt: token,
    };
    return res.status(200).send(foundUser);
  }
);

export { router as signInRouter };
