import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
  reason = "Bad Request";
  statusCode = 400;

  constructor(public message: string) {
    super(message || "Bad Request");

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message || this.reason }];
  }
}
