import User from "../models/userModel.js";
import Task from "../models/taskModel.js";
const addNewTask = async (req, res) => {
	const {
		title,
		description,
		dueDate,
		status,
		assignedTo,
		createdBy,
		priority,
	} = req.body;
	try {
		const task = await Task.findOne({ title, assignedTo });
		if (task) {
			return res.status(400).json({ message: "Task already present" });
		}
		const newTask = new Task({
			title,
			description,
			dueDate,
			status,
			assignedTo,
			createdBy,
			priority,
		});
		await newTask.save();
		res.status(201).json({ message: "Task added" });
	} catch (error) {
		console.log("Error in addnewtask controller");
		res.status(500).json({ error: error.message });
	}
};

const deleteTask = async (req, res) => {
	const taskId = req.params.id;
	try {
		await Task.findByIdAndDelete(taskId);
		res.status(200).json({ message: "Task deleted" });
	} catch (error) {
		console.log("Error in delete task controller");
		res.status(500).json({ error: error.message });
	}
};
const updateTask = async (req, res) => {
	const { taskId, updatedData } = req.body;
	try {
		const task = await Task.findByIdAndUpdate(
			taskId,
			{ ...updatedData },
			{ new: true }
		);
		await task.save();
		res.status(201).json(task);
	} catch (error) {
		console.log("Error in update task controller");
		res.status(500).json({ error: error.message });
	}
};
const getTasks = async (req, res) => {
	const userId = req.user._id;
	const isAdmin = req.user.isAdmin;
	try {
		let tasks;
		if (isAdmin) {
			tasks = await Task.find({
				$or: [{ assignedTo: userId }, { createdBy: userId }],
			});
		} else {
			tasks = await Task.find({ assignedTo: userId });
		}
		res.status(200).json(tasks);
	} catch (error) {
		console.log("Error in update task controller");
		res.status(500).json({ error: error.message });
	}
};
export { addNewTask, deleteTask, updateTask, getTasks };
