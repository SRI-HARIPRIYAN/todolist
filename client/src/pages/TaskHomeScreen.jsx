import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Header from "../components/Header.jsx";
import { Outlet } from "react-router-dom";
import useGetTasksHook from "../hooks/task/useGetTasksHook.js";
import Spinner from "../components/Spinner.jsx";
const TaskHomeScreen = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { getTasks, loading } = useGetTasksHook();
	useEffect(() => {
		getTasks();
	}, []);
	if (loading) return <Spinner />;
	return (
		<div className="w-screen h-screen relative bg-sky-100 ">
			<div className=" w-screen flex">
				<Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
				<section className="md:w-[70%] flex-grow">
					<Header setIsOpen={setIsOpen} />
					<Outlet />
				</section>
			</div>
		</div>
	);
};

export default TaskHomeScreen;
