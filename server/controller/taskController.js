import Task from "../model/taskModel/js";

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
	const { taskId } = req.params.id;
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
		const taskId = req.params.id;
		const updates = req.body;
		const updatedTask = await Task.findByIdAndUpdate(taskId, updates, {
			new: true,
		});
	} catch (error) {
		console.log("error in update task controller");
		res.status(400).json({ error: error.message });
	}
};

export { addTask, deleteTask, updateTask };
