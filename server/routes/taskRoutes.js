import express from "express";
import protect from "../middleware/authMiddleware/protect.js";
import {
	addTask,
	deleteTask,
	updateTask,
} from "../controller/taskController.js";

const router = express.Router();

router.route("/add").post(protect, addTask);
router.route("/:id").patch(protect, updateTask).delete(deleteTask);

export default router;
