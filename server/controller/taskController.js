import Task from "../model/taskModel.js";
import Team from "../model/teamModel.js";
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
	const { id: userId } = req.user;
	try {
		const tasks = await Task.find({ assignedTo: userId });
		res.status(200).json(tasks);
	} catch (error) {
		console.log("error in get task controller");
		res.status(500).json({ error: error.message });
	}
};

const getTeamTasks = async (req, res) => {
	try {
		const { id: teamId } = req.params;
		const { id: userId } = req.user;

		const team = await Team.findById(teamId);
		const teamMembers = team.members;

		if (teamMembers.length === 0) {
			return res.status(400).json({ message: "No team members found" });
		}

		const memberTasks = await Task.find({
			createdBy: userId,
			assignedTo: { $in: teamMembers },
		});
		res.status(200).json(memberTasks);
	} catch (error) {
		console.log("error in get task controller");
		res.status(500).json({ error: error.message });
	}
};
const getTaskSummary = async (req, res) => {
	try {
		const { id: userId } = req.user;
		let matchCriteria = { assignedTo: userId };

		const totalTasks = await Task.countDocuments(matchCriteria);
		const completedTasks = await Task.countDocuments({
			...matchCriteria,
			status: "completed",
		});
		const pendingTasks = await Task.countDocuments({
			...matchCriteria,
			status: "pending",
		});
		const inProgressTasks = await Task.countDocuments({
			...matchCriteria,
			status: "inProgress",
		});
		const tasks = await Task.aggregate([
			{ $match: { assignedTo: userId } },
		]);

		console.log("Matched tasks using aggregate:", tasks);

		const taskByStatus = await Task.aggregate([
			{ $match: matchCriteria },
			{ $group: { _id: "$status", count: { $sum: 1 } } },
		]);

		const summary = {
			totalTasks,
			completedTasks,
			pendingTasks,
			inProgressTasks,
			taskByStatus,
		};
		res.status(200).json(summary);
	} catch (error) {
		console.log("error in get task controller", error.message);
		res.status(500).json({
			success: false,
			message: "Server error while generating task summary",
			error: error.message,
		});
	}
};

const getTeamTaskSummary = async (req, res) => {
	try {
		const { id: userId } = req.user;
		const { id: teamId } = req.params;
		const team = await Team.findById(teamId);
		const teamMembers = team.members;

		if (teamMembers.length === 0) {
			return res.status(400).json({ message: "No team members found" });
		}
		const matchCriteria = {
			createdBy: userId,
			assignedTo: { $in: teamMembers },
		};

		const totalTeamTasks = await Task.countDocuments(matchCriteria);
		const completedTasks = await Task.countDocuments({
			...matchCriteria,
			status: "completed",
		});
		const pendingTeamTasks = await Task.countDocuments({
			...matchCriteria,
			status: "pending",
		});
		const inProgressTeamTasks = await Task.countDocuments({
			...matchCriteria,
			status: "inProgress",
		});
		const teamTasksByStatus = await Task.aggregate([
			{ $match: matchCriteria },
			{ $group: { _id: "$status", count: { $sum: 1 } } },
		]);

		const summary = {
			totalTeamTasks,
			completedTasks,
			pendingTeamTasks,
			inProgressTeamTasks,
			teamTasksByStatus,
		};

		res.status(200).json(summary);
	} catch (error) {
		console.log("error in get task controller");
		res.status(500).json({
			success: false,
			message: "Server error while generating task summary",
			error: error.message,
		});
	}
};

export {
	addTask,
	deleteTask,
	updateTask,
	getTasks,
	getTeamTasks,
	getTaskSummary,
	getTeamTaskSummary,
};
