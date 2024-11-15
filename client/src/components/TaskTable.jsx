import React, { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { useUserContext } from "../context.jsx";
const TaskTable = ({ selectedOption }) => {
	//get from global state
	const { userTasks } = useUserContext();
	const [tableTasks, setTableTasks] = useState([]);
	const option = selectedOption;
	useEffect(() => {
		let filteredTasks = userTasks;
		if (option === "completed") {
			filteredTasks = userTasks?.filter(
				(task) => task.status === "completed"
			);
		} else if (option === "inProgress") {
			filteredTasks = userTasks?.filter(
				(task) => task.status === "inProgress"
			);
		} else if (option === "pending") {
			filteredTasks = userTasks?.filter(
				(task) => task.status === "pending"
			);
		}
		setTableTasks(filteredTasks);
	}, [userTasks, option]);
	return (
		<div className="bg-white pt-6 md:w-2/3">
			{tableTasks?.length === 0 ? (
				<p>Add a task and get to work!!!</p>
			) : (
				<table className=" w-full text-sm  bg-white text-center">
					<thead className="font-normal text-sm py-2 border-collapse">
						<tr>
							<th className=" border-2 ">
								<TiTick className="inline text-lg" />
							</th>
							<th className=" border-2">Title</th>
							<th className=" border-2">Description</th>
							<th className=" border-2">Due</th>
						</tr>
					</thead>
					<tbody>
						{userTasks?.map((task, index) => (
							<tr key={index}>
								<td>{index + 1}</td>
								<td>{task.title}</td>
								<td>{task.description}</td>
								<td>{task.status}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default TaskTable;
