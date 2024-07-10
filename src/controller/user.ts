import { NextFunction, Request, Response } from "express";
import * as UserService from "../service/user";

import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("UserController");

export function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = res.json(UserService.getUsers());
    return users;
  } catch (e) {
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
    const message = await UserService.createUser(body);
    return res.json(message);
  } catch (e) {
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
    const message = await UserService.updateUsers(id, req.body);
    return res.json(message);
  } catch (e) {
    next(e);
  }
}

// Delete a User
export function deleteUsers(req: Request, res: Response, next: NextFunction) {
  const id = parseInt(req.params.id);
  try {
    const message = UserService.deleteUsers(id);
    return res.json(message);
  } catch (e) {
    next(e);
  }
}
