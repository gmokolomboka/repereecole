import { Response } from "express";
import { ApiResponse } from "../types";

export const sendSuccess = <T>(
  res: Response,
  data: T,
  statusCode: number = 200,
  message?: string
) => {
  const response: ApiResponse<T> = {
    success: true,
    data,
    message,
  };
  res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  error: string,
  statusCode: number = 400,
  message?: string
) => {
  const response: ApiResponse = {
    success: false,
    error,
    message,
  };
  res.status(statusCode).json(response);
};

export const sendNotFound = (res: Response, message: string = "Resource not found") => {
  sendError(res, "NOT_FOUND", 404, message);
};

export const sendUnauthorized = (res: Response, message: string = "Unauthorized") => {
  sendError(res, "UNAUTHORIZED", 401, message);
};

export const sendValidationError = (res: Response, message: string) => {
  sendError(res, "VALIDATION_ERROR", 422, message);
};
