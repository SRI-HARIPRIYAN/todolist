import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Header from "../components/Header.jsx";
import TaskSummary from "../components/TaskSummary.jsx";
import TaskList from "../components/TaskList.jsx";
import { Outlet } from "react-router-dom";

const TaskHomeScreen = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div className="w-screen h-screen relative bg-sky-100 ">
			<div className=" flex">
				<Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
				<section className=" flex-grow">
					<Header setIsOpen={setIsOpen} />

					<Outlet />
				</section>
			</div>
		</div>
	);
};

export default TaskHomeScreen;
