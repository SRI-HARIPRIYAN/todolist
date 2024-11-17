import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Spinner from "../Spinner.jsx";
import useUpdateTashHook from "../../hooks/task/useUpdateTaskHook";
const AllTasks = () => {
	const { updateTask, loading } = useUpdateTashHook();
	let tasks = [
		{
			title: "task1",
			description: "des1",
			due: "20-11-2002",
			status: "pending",
		},
		{
			title: "task2",
			description: "des2",
			due: "20-11-2002",
			status: "pending",
		},
	];
	const handleChange = async (taskId, e) => {
		e.preventDefault();
		await updateTask(taskId, { status: e.target.value });
	};
	if (loading) {
		return <Spinner />;
	}
	return (
		<div className="p-2 flex flex-col gap-2 ">
			<div className="">
				<h2 className="bg-white p-2 font-bold my-2">Personal tasks</h2>

				<div className="">
					<table className="border-2 bg-white w-full overflow-x-scroll text-center ">
						<thead>
							<tr className=" py-2 opacity-75 ">
								<th className="w-1/5">Title</th>
								<th className="w-1/5">Description</th>
								<th className="w-1/5">Due </th>
								<th className="w-1/5">Status</th>
								<th className="w-1/5">
									<IoMdCheckmarkCircleOutline className="inline" />
								</th>
							</tr>
						</thead>
						<tbody className="">
							{tasks.map((task, i) => (
								<tr key={i} className="border-2  ">
									<td>{task.title}</td>
									<td>{task.description}</td>
									<td>{task.due}</td>
									<td>{task.status}</td>
									<td>
										<select
											name="status"
											id="status"
											onChange={(e) =>
												handleChange(task._id, e)
											}
										>
											<option value="pending">
												pending
											</option>
											<option value="inProgress">
												In Progress
											</option>
											<option value="completed">
												Completed
											</option>
										</select>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			<div className="overflow-x-scroll">
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
			</div>
		</div>
	);
};

export default AllTasks;
