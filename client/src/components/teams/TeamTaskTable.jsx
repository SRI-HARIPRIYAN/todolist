import React, { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { useUserContext } from "../../context";
import useGetTeamTasksHook from "../../hooks/task/useGetTeamTasksHook";
import formatDueDate from "../../utils/formatDueDate";

const TeamTaskTable = ({ selectedOption }) => {
	const [teamTasks, setTeamTasks] = useState([]);
	const { selectedTeam } = useUserContext();
	const { getTeamTasks } = useGetTeamTasksHook();

	useEffect(() => {
		async function getAllTasks() {
			const tasks = await getTeamTasks(selectedTeam?._id);
			if (selectedOption === "completed") {
				setTeamTasks(
					tasks?.filter((task) => task.status === "completed")
				);
			} else if (selectedOption === "inProgress") {
				setTeamTasks(
					tasks?.filter((task) => task.status === "inProgress")
				);
			} else if (selectedOption === "pending") {
				setTeamTasks(
					tasks?.filter((task) => task.status === "pending")
				);
			} else {
				setTeamTasks(tasks);
			}
		}

		if (selectedTeam?._id && selectedTeam.members.length !== 0) {
			getAllTasks();
		}
	}, [selectedTeam, selectedOption]);

	return (
		<div className="bg-white pt-6 md:w-2/3 overflow-x-scroll">
			<table className=" w-full text-sm  bg-white text-center">
				<thead className="font-normal text-sm py-2 border-collapse">
					<tr>
						<th className=" border-2 ">
							<TiTick className="inline text-lg" />
						</th>
						<th className=" border-2">Title</th>
						<th className=" border-2">Description</th>
						<th className=" border-2">Assigned To</th>
						<th className="border-2">
							{selectedOption === "allTasks" ? "Status" : "Due"}
						</th>
					</tr>
				</thead>
				<tbody>
					{teamTasks?.map((task, i) => (
						<tr className=" border-b-2" key={i}>
							<td>{i + 1}</td>
							<td>{task.title}</td>
							<td>{task.description}</td>
							<td>{task.assignedTo.userName}</td>
							<td
								className={` ${
									task.status === "pending"
										? "text-red-300"
										: "text-blue-300"
								}`}
							>
								{selectedOption === "allTasks"
									? task.status
									: formatDueDate(task.dueDate)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default TeamTaskTable;
