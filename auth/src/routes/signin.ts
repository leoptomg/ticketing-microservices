import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken"

import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";
import { Password } from "../services/password";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password must be valid"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({email})

    if (!user){
      throw new BadRequestError('Invalid Credentials')
    }
    
    const keyMatch = await Password.compare(user.password, password)

    if (!keyMatch){
      throw new BadRequestError('Invalid Credentials')
    }

    // TODO REVIEW
    const userJwt = jwt.sign({
      id: user.id,
      email: user.email
    }, process.env.JWT_KEY!)

    req.session = {
      jwt: userJwt
    }

    res.status(200).send(user)
  }
);

export { router as signinRouter };
