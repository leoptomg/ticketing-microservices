import { CustomError } from "./custom-error";

export class DataBaseError extends CustomError {
  statusCode = 500;
  reason = "Error connecting to database";

  constructor() {
    super("Error connecting to database");

    Object.setPrototypeOf(this, DataBaseError.prototype)
  }

    
  serializeErrors(): { message: string; field?: string | undefined; }[] {
    return [{ message: this.reason }];
  }
}
