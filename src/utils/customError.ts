export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }

  // Override the toString() method to remove the "CustomError" prefix
  toString() {
    return this.message;
  }
}
