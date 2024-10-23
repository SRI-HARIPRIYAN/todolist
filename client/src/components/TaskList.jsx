import React, { useState } from "react";
import TaskTable from "./TaskTable";

const TaskList = () => {
	const [selectedOption, setSelectedOption] = useState("allTasks");
	return (
		<div className="">
			<nav className="flex justify-start border-2  bg-white ">
				<button
					onClick={() => setSelectedOption("allTasks")}
					className={` border-r-2 p-2 hover:bg-sky-100 hover:font-semibold ${
						selectedOption === "allTasks"
							? "bg-sky-200 font-semibold"
							: ""
					} `}
				>
					{" "}
					All tasks
				</button>
				<button
					onClick={() => setSelectedOption("inComplete")}
					className={` border-r-2 p-2 hover:bg-sky-100 hover:font-semibold ${
						selectedOption === "incomplete"
							? "bg-sky-200 font-semibold"
							: ""
					} `}
				>
					{" "}
					Incomplete
				</button>
				<button
					onClick={() => setSelectedOption("inProgress")}
					className={` border-r-2 p-2 hover:bg-sky-100 hover:font-semibold ${
						selectedOption === "inProgress"
							? "bg-sky-200 font-semibold"
							: ""
					} `}
				>
					{" "}
					In progress
				</button>
				<button
					onClick={() => setSelectedOption("completed")}
					className={` border-r-2 p-2 hover:bg-sky-100 hover:font-semibold ${
						selectedOption === "completed"
							? "bg-sky-200 font-semibold"
							: ""
					} `}
				>
					{" "}
					Completed
				</button>
			</nav>
			<TaskTable selectedOption={selectedOption} />
		</div>
	);
};

export default TaskList;
