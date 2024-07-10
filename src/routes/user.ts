import express from "express";
import {
  createUser,
  getUsers,
  updateUsers,
  deleteUsers,
} from "../controller/user";
import { auth, authorize } from "../middlewares/auth";

const userRoutes = express.Router();

userRoutes.get("/", auth, authorize("users.get"), getUsers);
userRoutes.post("/", authorize("user.post"), createUser);
userRoutes.put("/:id", auth, authorize("users.put"), updateUsers);
userRoutes.delete("/:id", auth, authorize("users.delete"), deleteUsers);

export default userRoutes;
