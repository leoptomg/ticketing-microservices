import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { RequestValidationError } from "../errors/request-validation-error";

import {User} from '../models/user'

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 6, max: 8 })
      .withMessage("Password must be valid"),
  ],
  async (req: Request, res: Response) => {
    const erros = validationResult(req)

    if(!erros.isEmpty()){
      throw new RequestValidationError(erros.array())
    }
    
    const { email, password } = req.body;

    const existsUser = await User.findOne({email})

    if (existsUser){
      throw new BadRequestError('Email in use')
    }

    const user = User.build({email, password})
    await user.save()

    res.status(201).send(user)
  }
);

export { router as signupRouter };
