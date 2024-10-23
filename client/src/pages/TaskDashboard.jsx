import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Header from "../components/Header.jsx";
import TaskSummary from "../components/TaskSummary.jsx";
import TaskList from "../components/TaskList.jsx";

const TaskDashboard = () => {
	const [isOpen, setIsOpen] = useState(true);
	return (
		<div className="w-screen h-screen relative bg-sky-100 ">
			{/* <Navbar isOpen={isOpen} /> */}
			<div>
				<Header />

				<h1 className="font-bold p-2">
					Task Management
					<span className=" opacity-25 text-sm">dashboard</span>
				</h1>
				<TaskSummary />
				<TaskList />
			</div>
		</div>
	);
};

export default TaskDashboard;
