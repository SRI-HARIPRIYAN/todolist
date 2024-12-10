import Task from "../model/taskModel.js";
import Team from "../model/teamModel.js";
import User from "../model/userModel.js";
const addTask = async (req, res) => {
	console.log(req.body);
	const { title, description, dueDate, assignTo } = req.body;
	const userId = req.user._id;
	try {
		const assignedUserExists = await User.findOne({ userName: assignTo });
		if (!assignedUserExists) {
			return res.status(404).json({ message: "User not found" });
		}
		const taskExists = await Task.findOne({
			title,
			assignedTo: assignedUserExists._id,
		});
		if (taskExists) {
			return res.status(400).json({ message: "Task already assigned" });
		}
		const task = await Task.create({
			title,
			description,
			dueDate,
			assignedTo: assignedUserExists._id,
			createdBy: userId,
		});
		res.status(201).json(task);
	} catch (error) {
		console.log("error in addTask controller", error);
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
		})
			.populate("assignedTo", "userName")
			.select("-__v -createdAt -updatedAt");
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

		const tasks = await Task.find(matchCriteria);
		const totalTasks = tasks.length;
		const completedTasks = tasks.filter(
			(task) => task.status === "completed"
		).length;
		const pendingTasks = tasks.filter(
			(task) => task.status === "pending"
		).length;
		const inProgressTasks = tasks.filter(
			(task) => task.status === "inProgress"
		).length;

		const taskByStatus = tasks.reduce((acc, task) => {
			acc[task.status] = (acc[task.status] || 0) + 1;
			return acc;
		}, {});

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

		const matchCriteria = {
			createdBy: userId,
			assignedTo: { $in: teamMembers },
		};

		const tasks = await Task.find(matchCriteria);

		const totalTeamTasks = tasks.length;
		const completedTasks = tasks.filter(
			(task) => task.status === "completed"
		).length;
		const pendingTeamTasks = tasks.filter(
			(task) => task.status === "pending"
		).length;
		const inProgressTeamTasks = tasks.filter(
			(task) => task.status === "inProgress"
		).length;

		const teamTasksByStatus = tasks.reduce((acc, task) => {
			acc[task.status] = (acc[task.status] || 0) + 1;
			return acc;
		}, {});

		if (teamMembers.length === 0) {
			return res.status(400).json({ message: "No team members found" });
		}

		const summary = {
			totalTeamTasks,
			completedTasks,
			pendingTeamTasks,
			inProgressTeamTasks,
			teamTasksByStatus,
		};

		res.status(200).json(summary);
	} catch (error) {
		console.log("error in get team task summary controller");
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
