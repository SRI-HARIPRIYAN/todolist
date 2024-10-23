import React from "react";
import { FaRegListAlt } from "react-icons/fa";
import { FaPenSquare } from "react-icons/fa";
import { RiProgress6Line } from "react-icons/ri";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
const TaskSummary = () => {
	return (
		<div className="flex flex-col gap-3 p-5">
			<h2 className="bg-white p-2 ">Task Dashboard</h2>
			<ul className="flex gap-3">
				<li className=" bg-white h-14 flex items-center w-[150px] text-sm font-semibold p-2 rounded-lg">
					<div className=" bg-blue-500 p-2 rounded-full mr-2">
						<FaRegListAlt className="  bg-transparent text-white text-xl" />
					</div>
					All tasks
				</li>
				<li className=" bg-white h-14 flex items-center w-[150px] text-sm font-semibold p-2 rounded-lg">
					<div className=" bg-sky-500 p-2 rounded-full mr-2">
						<FaPenSquare className="  bg-transparent text-white text-xl" />
					</div>
					Incomplete
				</li>
				<li className=" bg-white h-14 flex items-center w-[150px] text-sm font-semibold p-2 rounded-lg">
					<div className=" bg-yellow-500 p-2 rounded-full mr-2">
						<RiProgress6Line className="  bg-transparent text-white text-xl" />
					</div>
					Inprogress
				</li>
				<li className=" bg-white h-14 flex items-center w-[150px] text-sm font-semibold p-2 rounded-lg">
					<div className=" bg-green-500 p-2 rounded-full mr-2">
						<IoCheckmarkDoneCircle className="  bg-transparent text-white text-xl" />
					</div>
					Completed
				</li>
			</ul>
		</div>
	);
};

export default TaskSummary;
