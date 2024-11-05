import React, { useState } from "react";
import TaskSummary from "../TaskSummary.jsx";
import TaskList from "../TaskList.jsx";
import { MdElectricBolt } from "react-icons/md";
import NewTask from "./NewTask.jsx";

const TaskDashboard = () => {
	const [openTask, setOpenTask] = useState(false);
	return (
		<div className="relative p-2">
			<h1 className="font-bold p-2">
				Task Management
				<span className="opacity-25 text-sm">dashboard</span>
			</h1>
			<button
				onClick={() => setOpenTask((prev) => !prev)}
				className="bg-sky-300 h-fit mb-3 px-3 py-1 rounded-sm text-white font-bold text-sm"
			>
				<MdElectricBolt className="text-white inline-block mr-1.5" />
				New Task
			</button>
			<TaskSummary />
			<TaskList />
			{openTask && <NewTask setOpenTask={setOpenTask} />}
		</div>
	);
};

export default TaskDashboard;
