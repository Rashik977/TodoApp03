import { NextFunction, Request, Response } from "express";
import * as UserService from "../service/user";

import loggerWithNameSpace from "../utils/logger";
import HTTP from "http-status-codes";

const logger = loggerWithNameSpace("UserController");

export function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    logger.info("Fetching all users");
    res.status(HTTP.OK).json(UserService.getUsers());
  } catch (e) {
    logger.error("Error fetching users", { error: e });
    next(e);
  }
}

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { body } = req;

  try {
    logger.info("Creating a new user", { user: body });
    const message = await UserService.createUser(body);
    res.status(HTTP.CREATED).json(message);
  } catch (e) {
    logger.error("Error creating user", { error: e });
    next(e);
  }
}

// Update a user
export async function updateUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = parseInt(req.params.id);

  try {
    logger.info("Updating user", { id });
    const message = await UserService.updateUsers(id, req.body);
    res.status(HTTP.OK).json(message);
  } catch (e) {
    logger.error("Error updating user", { error: e });
    next(e);
  }
}

// Delete a User
export function deleteUsers(req: Request, res: Response, next: NextFunction) {
  const id = parseInt(req.params.id);
  try {
    logger.info("Deleting user", { id });
    const message = UserService.deleteUsers(id);
    res.status(HTTP.OK).json(message);
  } catch (e) {
    logger.error("Error deleting user", { error: e });
    next(e);
  }
}
