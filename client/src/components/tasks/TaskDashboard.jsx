import React from "react";
import TaskSummary from "../TaskSummary.jsx";
import TaskList from "../TaskList.jsx";

const TaskDashboard = () => {
	return (
		<>
			<h1 className="font-bold p-2">
				Task Management
				<span className="opacity-25 text-sm">dashboard</span>
			</h1>
			<TaskSummary />
			<TaskList />
		</>
	);
};

export default TaskDashboard;
