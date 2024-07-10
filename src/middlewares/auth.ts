import config from "../config";
import e, { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";
import { CustomError } from "../utils/CustomError";
import { User } from "../interfaces/User";
import { Request } from "../interfaces/auth";

// Middleware to authenticate user
export async function auth(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    const error = new CustomError("Unauthenticated", 401);
    next(error);
    return;
  }

  const token = authorization.split(" ");

  if (token.length !== 2 || token[0] !== "Bearer") {
    const error = new CustomError("Invalid token", 400);
    next(error);
    return;
  }

  try {
    const user = (await verify(token[1], config.jwt.secret!)) as User;

    req.user = user;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "TokenExpiredError") {
        const customError = new CustomError("Token has expired", 401);
        next(customError);
        return;
      } else if (error.name === "JsonWebTokenError") {
        const customError = new CustomError("Invalid token", 400);
        next(customError);
        return;
      }
    }
    const unknownError = new CustomError("Could not authenticate", 500);
    next(unknownError);
  }
  next();
}

export function authorize(permission: string) {
  return function (req: Request, res: Response, next: NextFunction) {
    const user = req.user!;

    if (!user.permissions.includes(permission)) {
      const error = new CustomError("Forbidden", 403);
      next(error);
      return;
    }
    next();
  };
}
