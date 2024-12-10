import React, { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { useUserContext } from "../context.jsx";
import formatDueDate from "../utils/formatDueDate.js";
const TaskTable = ({ selectedOption }) => {
	const { userTasks } = useUserContext();
	const [tableTasks, setTableTasks] = useState(userTasks);
	useEffect(() => {
		if (selectedOption === "completed") {
			setTableTasks(
				userTasks?.filter((task) => task.status === "completed")
			);
		} else if (selectedOption === "inProgress") {
			setTableTasks(
				userTasks?.filter((task) => task.status === "inProgress")
			);
		} else if (selectedOption === "pending") {
			setTableTasks(
				userTasks?.filter((task) => task.status === "pending")
			);
		} else {
			setTableTasks(userTasks);
		}
	}, [userTasks, selectedOption]);
	console.log(tableTasks);
	return (
		<div className="bg-white pt-6 md:w-2/3">
			{tableTasks?.length === 0 ? (
				<p>Add a task and get to work!!!</p>
			) : (
				<table className=" w-full text-sm bg-white text-center">
					<thead className="font-normal text-sm py-2 border-collapse">
						<tr>
							<th className=" border-2 ">
								<TiTick className="inline text-lg" />
							</th>
							<th className=" border-2">Title</th>
							<th className=" border-2">Description</th>
							<th className=" border-2">
								{selectedOption === "allTasks"
									? "Status"
									: "Due"}
							</th>
						</tr>
					</thead>
					<tbody>
						{tableTasks?.map((task, index) => (
							<tr key={index}>
								<td>{index + 1}</td>
								<td>{task.title}</td>
								<td>{task.description}</td>
								<td>
									{selectedOption === "allTasks"
										? task.status
										: formatDueDate(task.dueDate)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default TaskTable;
