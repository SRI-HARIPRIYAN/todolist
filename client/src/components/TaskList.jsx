import React, { useState } from "react";
import TaskTable from "./TaskTable";

const TaskList = () => {
	const [selectedOption, setSelectedOption] = useState("allTasks");
	return (
		<div className="p-2 sm:p-5 ">
			<h2 className="bg-white p-2 ">Task Dashboard</h2>
			<nav className="flex justify-start  overflow-x-clip text-xs sm:text-sm  bg-slate-100 mt-4 ">
				<button
					onClick={() => setSelectedOption("allTasks")}
					className={`border-t-4 border-opacity-0 p-2 sm:px-6 md:px-10 ${
						selectedOption === "allTasks"
							? "bg-white font-semibold  border-t-sky-600 border-opacity-100"
							: " border-t-transparent"
					} `}
				>
					All tasks
				</button>
				<button
					onClick={() => setSelectedOption("inComplete")}
					className={` border-t-4 border-opacity-0 p-2 sm:px-6 md:px-10  ${
						selectedOption === "inComplete"
							? "bg-white border-t-sky-600 border-opacity-100 font-semibold"
							: "border-t-transparent"
					} `}
				>
					Incomplete
				</button>
				<button
					onClick={() => setSelectedOption("inProgress")}
					className={` border-t-4 border-opacity-0 p-2 sm:px-6 md:px-10  ${
						selectedOption === "inProgress"
							? "bg-white border-t-sky-600 border-opacity-100 font-semibold"
							: "border-t-transparent"
					} `}
				>
					In progress
				</button>
				<button
					onClick={() => setSelectedOption("completed")}
					className={` border-t-4 border-opacity-0 p-2 sm:px-6 md:px-10  ${
						selectedOption === "completed"
							? "bg-white border-t-sky-600 border-opacity-100 font-semibold"
							: "border-t-transparent"
					} `}
				>
					Completed
				</button>
			</nav>
			<TaskTable selectedOption={selectedOption} />
		</div>
	);
};

export default TaskList;
