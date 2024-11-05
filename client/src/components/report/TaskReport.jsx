import React from "react";
import { Chart } from "react-google-charts";
const TaskReport = () => {
	const tasks = [
		["Task", "Status"],
		["Completed", 10],
		["In Progress", 20],
		["Pending", 10],
	];
	const options = {
		title: "My Task Summary",
		colors: ["#8AD1C2", "#9F8AD1", "#D18A99"],
	};
	return (
		<div>
			TaskReport
			<Chart
				className=" w-[80%] h-full mx-auto "
				chartType="PieChart"
				data={tasks}
				options={options}
			/>
		</div>
	);
};

export default TaskReport;
