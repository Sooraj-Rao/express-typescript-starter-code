import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.message);
  let statusCode = 500;
  let message = "Something went wrong!";

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = err.message;
  } else if (err.name === "DatabaseError") {
    statusCode = 409;
    message = err.message;
  }

  res.status(statusCode).send({
    error: true,
    message,
  });
};
