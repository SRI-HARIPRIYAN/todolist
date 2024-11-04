import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const AllTasks = () => {
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
	return (
		<div className="p-2 flex flex-col gap-2 ">
			<div className="overflow-x-scroll">
				<h2 className="bg-white p-2 font-bold my-2">Personal tasks</h2>

				<div className="overflow-scroll">
					<table className="border-2 bg-white w-full overflow-x-scroll text-center ">
						<thead>
							<tr className=" py-2 opacity-75 ">
								<th className="w-1/5">
									<IoMdCheckmarkCircleOutline className="inline" />
								</th>
								<th className="w-1/5">Title</th>
								<th className="w-1/5">Description</th>
								<th className="w-1/5">Due </th>
								<th className="w-1/5">Status</th>
							</tr>
						</thead>
						<tbody className="">
							{tasks.map((task, i) => (
								<tr key={i} className="border-2  ">
									<td className="w-">
										<input
											className="inline-block w-[30px]"
											type="checkbox"
											name=""
											id=""
											defaultChecked={
												task.status === "pending"
											}
										/>
									</td>
									<td>{task.title}</td>
									<td>{task.description}</td>
									<td>{task.due}</td>
									<td>{task.status}</td>
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
							<th>
								<IoMdCheckmarkCircleOutline />
							</th>
							<th>Title</th>
							<th>Description</th>
							<th>Due </th>
							<th>Status</th>
						</tr>
					</thead>
				</table>
			</div>
		</div>
	);
};

export default AllTasks;
