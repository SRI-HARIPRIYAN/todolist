import React, { useEffect } from "react";
import Spinner from "../Spinner.jsx";
import useUpdateTashHook from "../../hooks/task/useUpdateTaskHook";
import { useUserContext } from "../../context.jsx";
import useGetTasksHook from "../../hooks/task/useGetTasksHook.js";
import { MdDelete } from "react-icons/md";
import useDeleteTaskHook from "../../hooks/task/useDeleteTaskHook.js";
import { FaRegEdit } from "react-icons/fa";
import formatDueDate from "../../utils/formatDueDate.js";
const AllTasks = () => {
	const { updateTask, loading } = useUpdateTashHook();
	const { userTasks } = useUserContext();
	const { getTasks } = useGetTasksHook();
	const { deleteTask } = useDeleteTaskHook();
	const handleChange = async (taskId, e) => {
		e.preventDefault();
		let val = e.target.value;
		console.log(val);
		await updateTask(taskId, { status: val });
		getTasks();
	};
	useEffect(() => {
		getTasks();
	}, []);
	if (loading) {
		return <Spinner />;
	}
	return (
		<div className="p-2 flex flex-col gap-2 bg-sky-100 w-screen">
			<h2 className="bg-white p-2 font-bold my-2">Personal tasks</h2>
			<div className="w-full overflow-x-scroll">
				<table className="border-2  bg-white text-center">
					<thead>
						<tr className=" py-2 opacity-75 ">
							<th className="w-1/5">Title</th>
							<th className="w-1/5">Description</th>
							<th className="w-1/5">Due </th>
							<th className="w-1/5">Status</th>
							<th className="w-1/5">
								<FaRegEdit className="inline" />
							</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody className="">
						{userTasks.map((task, i) => (
							<tr key={i} className="border-2  ">
								<td className="">{task.title}</td>
								<td className="overflow-x-hidden">
									{task.description}
								</td>
								<td>{formatDueDate(task.dueDate)}</td>
								<td>{task.status}</td>
								<td>
									<select
										name="status"
										id="status"
										value={task.status}
										onChange={(e) =>
											handleChange(task._id, e)
										}
									>
										<option value="pending">pending</option>
										<option value="inProgress">
											In Progress
										</option>
										<option value="completed">
											Completed
										</option>
									</select>
								</td>
								<td>
									<div
										onClick={async () => {
											deleteTask(task._id);
										}}
									>
										<MdDelete size={20} />
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{/* <div className="overflow-x-scroll">
				<h2 className="bg-white p-2 font-bold my-2">Assigned tasks </h2>
				<table>
					<thead>
						<tr>
							<th>Title</th>
							<th>Description</th>
							<th>Due </th>
							<th>Status</th>
							<th>
								<IoMdCheckmarkCircleOutline />
							</th>
						</tr>
					</thead>
				</table>
			</div> */}
		</div>
	);
};

export default AllTasks;
