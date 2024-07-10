import express from "express";
import { createUser, getUsers } from "../controller/user";
import { auth, authorize } from "../middlewares/auth";

const userRoutes = express.Router();

userRoutes.get("/", auth, authorize("users.get"), getUsers);
userRoutes.post("/", createUser);

export default userRoutes;
