import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
	addNewTask,
	updateTask,
	deleteTask,
	getTasks,
} from "../controllers/taskController.js";
const router = express.Router();

router.route("/:id").delete(protect, deleteTask);
router.route("/update").patch(protect, updateTask);
router.route("/addTask").post(protect, addNewTask);
router.route("/getTasks").get(protect, getTasks);

export default router;
