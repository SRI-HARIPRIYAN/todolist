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
		<div className="bg-white pt-6 overflow-x-scroll">
			{tableTasks?.length === 0 ? (
				<p className=" text-center font-semibold text-green-600 py-20">
					Add a task and get to work!!!
				</p>
			) : (
				<div className=" overflow-x-scroll  h-[200px]">
					<table className=" w-full overflow-x-scroll text-sm bg-white text-center">
						<thead className="font-normal text-sm bg-slate-400 border-collapse sticky top-0">
							<tr>
								<th className=" border-2 py-2 ">
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
								<tr
									className={` border-b-2 ${
										index % 2 == 0
											? "bg-gray-200"
											: "bg-gray-100"
									}`}
									key={index}
								>
									<td>{index + 1}</td>
									<td>{task.title}</td>
									<td className=" line-clamp-1 min-w-28">
										{task.description}
									</td>
									<td className="w-28 py-2">
										{selectedOption === "allTasks"
											? task.status
											: formatDueDate(task.dueDate)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default TaskTable;
