import React, { useState } from "react";
import Header from "../components/Header.jsx";
import { useFetchTasks } from "../hooks/taskManager/getTasksHook.js";
import SignIn from "../components/SignIn.jsx";
const Home = () => {
	const { tasks, loading, error } = useFetchTasks();
	if (loading) return <div>Loading tasks</div>;
	if (error) return <div>error {error}</div>;
	return (
		<div className=" min-w-full min-h-full flex flex-col">
			<Header />

			<ul>
				{tasks?.map((task) => (
					<li key={task._id}>{task.title}</li>
				))}
			</ul>
		</div>
	);
};

export default Home;
