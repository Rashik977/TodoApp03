import express from "express";
import {
  createUser,
  getUsers,
  updateUsers,
  deleteUsers,
} from "../controller/user";
import { authenticate, authorize } from "../middlewares/auth";

const userRoutes = express.Router();

userRoutes.get("/", authenticate, authorize("users.get"), getUsers);
userRoutes.post("/", authenticate, authorize("users.post"), createUser);
userRoutes.put("/:id", authenticate, authorize("users.put"), updateUsers);
userRoutes.delete("/:id", authenticate, authorize("users.delete"), deleteUsers);

export default userRoutes;
