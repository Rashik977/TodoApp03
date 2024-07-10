import express from "express";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from "../controller/task";
import { authenticate, authorize } from "../middlewares/auth";

const tasksRoutes = express.Router();

tasksRoutes.get("/", authenticate, authorize("tasks.get"), getTasks);

tasksRoutes.get("/:id", authenticate, authorize("tasks.get"), getTaskById);

tasksRoutes.post("/", authenticate, authorize("tasks.post"), createTask);

tasksRoutes.put("/:id", authenticate, authorize("tasks.put"), updateTask);

tasksRoutes.delete("/:id", authenticate, authorize("tasks.delete"), deleteTask);

export default tasksRoutes;
