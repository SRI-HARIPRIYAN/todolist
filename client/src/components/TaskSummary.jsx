import React, { useEffect } from "react";
import { FaRegListAlt } from "react-icons/fa";
import { FaPenSquare } from "react-icons/fa";
import { RiProgress6Line } from "react-icons/ri";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { useUserContext } from "../context";
const TaskSummary = () => {
	const { userTasks } = useUserContext();
	let completed = 0;
	let inProgress = 0;
	let pending = 0;
	let allTasks = userTasks.length;
	useEffect(() => {
		completed = userTasks.filter(
			(task) => task.status === "completed"
		).length;
		pending = userTasks.filter((task) => task.status === "pending").length;
		inProgress = userTasks.filter(
			(task) => task.status === "inProgress"
		).length;
	}, [userTasks]);
	return (
		<div className="flex flex-col gap-3 ">
			<h2 className="bg-white p-2 ">Task Dashboard</h2>
			<ul className="flex flex-col sm:flex-row gap-3 ">
				<li className=" bg-white h-14 flex items-center w-3/4 sm:w-[150px] text-sm font-semibold p-2 rounded-lg">
					<div className=" bg-blue-500 p-2 rounded-full mr-2">
						<FaRegListAlt className="  bg-transparent text-white text-xl" />
					</div>
					<div className="flex sm:flex-col w-full">
						<p>All tasks</p>
						<span className="block font-normal ml-auto ">
							{allTasks}
						</span>
					</div>
				</li>
				<li className=" bg-white h-14 flex items-center w-3/4 sm:w-[150px] text-sm font-semibold p-2 rounded-lg">
					<div className=" bg-sky-500 p-2 rounded-full mr-2">
						<FaPenSquare className="  bg-transparent text-white text-xl" />
					</div>
					<div className="flex sm:flex-col w-full">
						<p>Incomplete</p>
						<span className="block font-normal ml-auto ">
							{pending}
						</span>
					</div>
				</li>
				<li className=" bg-white h-14 flex items-center w-3/4 sm:w-[150px] text-sm font-semibold p-2 rounded-lg">
					<div className=" bg-yellow-500 p-2 rounded-full mr-2">
						<RiProgress6Line className="  bg-transparent text-white text-xl" />
					</div>
					<div className="flex sm:flex-col w-full">
						<p>Inprogress</p>
						<span className="block font-normal ml-auto ">
							{inProgress}
						</span>
					</div>
				</li>
				<li className=" bg-white h-14 flex items-center w-3/4 sm:w-[150px] text-sm font-semibold p-2 rounded-lg">
					<div className=" bg-green-500 p-2 rounded-full mr-2">
						<IoCheckmarkDoneCircle className="  bg-transparent text-white text-xl" />
					</div>
					<div className="flex sm:flex-col w-full">
						<p>Completed</p>
						<span className="block font-normal ml-auto ">
							{completed}
						</span>
					</div>
				</li>
			</ul>
		</div>
	);
};

export default TaskSummary;
