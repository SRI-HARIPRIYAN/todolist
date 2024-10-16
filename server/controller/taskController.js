import Task from "../model/taskModel.js";

const addTask = async (req, res) => {
	const { title, description, dueDate, assignedTo } = req.body;
	const userId = req.user._id;
	try {
		let task = await Task.findOne({ title, assignedTo });
		if (task) {
			return res.status(400).json({ message: "Task already assigned" });
		}
		task = new Task({
			title,
			description,
			dueDate,
			assignedTo,
			createdBy: userId,
		});
		await task.save();
		res.status(201).json(task);
	} catch (error) {
		console.log("error in addTask controller");
		res.status(400).json({ error: error.message });
	}
};

const deleteTask = async (req, res) => {
	const { id: taskId } = req.params;
	try {
		const deletedTask = await Task.findByIdAndDelete(taskId);
		if (!deletedTask) {
			return res.status(404).json({ message: "Task not found" });
		} else {
			res.status(200).json({
				message: "Task deleted successfully",
			});
		}
	} catch (error) {
		console.log("error in deleteTask controller");
		res.status(400).json({ error: error.message });
	}
};

const updateTask = async (req, res) => {
	try {
		const { id: taskId } = req.params;
		const updates = req.body;
		const updatedTask = await Task.findByIdAndUpdate(taskId, updates, {
			new: true,
			runValidators: true,
		});
		if (!updatedTask) {
			return res.status(404).json({ message: "Task not found" });
		}
		res.status(201).json(updatedTask);
	} catch (error) {
		console.log("error in update task controller");
		res.status(500).json({ error: error.message });
	}
};

const getTasks = async (req, res) => {
	const userId = req.user.id;
	try {
		const tasks = await Task.find({ assignedTo: userId });
		res.status(200).json(tasks);
	} catch (error) {
		console.log("error in get task controller");
		res.status(500).json({ error: error.message });
	}
};

export { addTask, deleteTask, updateTask, getTasks };
