import express from "express";
import protect from "../middleware/authMiddleware/protect.js";
import {
	addTask,
	deleteTask,
	getTasks,
	getTaskSummary,
	getTeamTasks,
	getTeamTaskSummary,
	updateTask,
} from "../controller/taskController.js";

const router = express.Router();
router.route("/").get(protect, getTasks);
router.route("/add").post(protect, addTask);
router.route("/:id").patch(protect, updateTask).delete(deleteTask);
router.route("/:id/team").get(protect, getTeamTasks);
router.route("/summary").get(protect, getTaskSummary);
router.route("/:id/summary").get(protect, getTeamTaskSummary);
export default router;
