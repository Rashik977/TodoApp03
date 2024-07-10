import { User } from "../interfaces/User";
import * as UserModel from "../model/user";
import bcrypt from "bcrypt";
import { CustomError } from "../utils/CustomError";

export const getUsers = () => {
  const users = UserModel.getUsers();

  if (!users) throw new CustomError("No users found", 404);

  return users;
};

export async function createUser(user: User) {
  if (!user.email || !user.password || !user.name)
    throw new CustomError("Email, name and password are required", 400);

  const existingUser = await getUserByEmail(user.email);
  if (existingUser) {
    throw new CustomError("User already exists", 400);
  }
  const password = await bcrypt.hash(user.password, 10);
  user.password = password;
  UserModel.createUser(user);
  return user;
}

export function getUserByEmail(email: string) {
  return UserModel.getUserByEmail(email);
}

// function to update a users
export const updateUsers = async (id: number, users: User) => {
  const usersIndex = UserModel.findUserIndexById(id);

  // Check if users exists
  if (usersIndex === -1) throw new CustomError("users not found", 404);

  const password = await bcrypt.hash(users.password, 10);
  users.password = password;

  UserModel.updateUser(id, users, usersIndex);

  return { message: "users updated" };
};

// function to delete a users
export const deleteUsers = (id: number) => {
  const usersIndex = UserModel.findUserIndexById(id);

  // Check if users exists
  if (usersIndex === -1) throw new CustomError("users not found", 404);

  // Delete users from userss array
  UserModel.deleteUser(usersIndex);

  return { message: "users deleted" };
};
