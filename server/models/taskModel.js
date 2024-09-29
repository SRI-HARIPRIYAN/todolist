import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	dueDate: {
		type: Date,
		required: true,
	},
	status: {
		type: String,
		enum: ["To Do", "In Progress", "Completed"],
		default: "To Do",
	},
	assignedTo: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	priority: {
		type: String,
		enum: ["Low", "Medium", "High"],
	},
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
