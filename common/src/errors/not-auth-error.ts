import { CustomError } from "./custom-error";

export class NotAuthError extends CustomError {
  reason = "UnAuthorized";
  statusCode = 401;

  constructor() {
    super("UnAuthorized");

    Object.setPrototypeOf(this, NotAuthError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
