import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { DataBaseError } from "../errors/database-error";
import { RequestValidationError } from "../errors/request-validation-error";

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
  (req: Request, res: Response) => {
    const erros = validationResult(req)

    if(!erros.isEmpty()){
      throw new RequestValidationError(erros.array())
    }
    
    const { email, password } = req.body;
    
    console.log('Creating a user...')
    throw new DataBaseError()

    res.send({})
  }
);

export { router as signupRouter };
