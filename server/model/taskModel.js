import mongoose, { Schema } from "mongoose";

const taskSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		dueDate: {
			type: Date,
			required: true,
		},
		status: {
			type: String,
			enum: ["pending", "inProgress", "completed"],
			default: "pending",
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		assignedTo: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Task = mongoose.model("Task", taskSchema);
export default Task;
