// errorHandler.ts
import { NextFunction, Request, Response } from "express";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err.name === "ValidationError") {
    // Handle Mongoose validation errors
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // Handle other types of errors
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};

export default errorHandler;
