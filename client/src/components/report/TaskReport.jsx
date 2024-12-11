import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { useUserContext } from "../../context";
const TaskReport = () => {
	const { userTasks } = useUserContext();
	const [tasks, setTasks] = useState([
		["Task", "Status"],
		["Completed", 0],
		["In Progress", 0],
		["Pending", 0],
	]);

	const options = {
		title: "TASK REPORT",
		colors: ["#8AD1C2", "#9F8AD1", "#D18A99"],
	};
	console.log(userTasks);
	useEffect(() => {
		let completed = userTasks.filter(
			(task) => task.status === "completed"
		).length;
		let inProgress = userTasks.filter(
			(task) => task.status === "inProgress"
		).length;
		let pending = userTasks.filter(
			(task) => task.status === "pending"
		).length;
		setTasks([
			["Task", "Status"],
			["Completed", completed],
			["In Progress", inProgress],
			["Pending", pending],
		]);
		console.log(tasks);
		console.log(completed);
	}, []);
	return (
		<div>
			<h2 className="font-semibold bg-white p-2 m-2 text-center">
				TaskReport
			</h2>
			<Chart
				className=" w-[90%] sm:w-[80%] h-full mx-auto "
				chartType="PieChart"
				data={tasks}
				options={options}
			/>
		</div>
	);
};

export default TaskReport;
