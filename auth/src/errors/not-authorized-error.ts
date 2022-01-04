import { CustomError } from "./custom-error";

export class NotAuthotizedError extends CustomError {
  statusCode = 401;

  constructor() {
    super("Not authorized");

    Object.setPrototypeOf(this, NotAuthotizedError.prototype);
  }

  serializeErrors() {
    return [{ message: "Not authorized" }];
  }
}
