import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTasks } from "react-icons/fa";
import { MdGroup } from "react-icons/md";
import { MdGroupAdd } from "react-icons/md";
import TeamTaskTable from "./TeamTaskTable";
import { MdAddTask } from "react-icons/md";
import AddTeamMember from "./AddTeamMember";
import AddNewTask from "./AddNewTask";
import useGetTeamInfoHook from "../../hooks/team/useGetTeamInfoHook";
import Spinner from "../Spinner";
import { useUserContext } from "../../context";
const TeamContainer = () => {
	const [selectedOption, setSelectedOption] = useState("allTasks");
	const [addNewMember, setAddNewMember] = useState(false);
	const [addNewTask, setAddNewTask] = useState(false);
	const [team, setTeam] = useState({});
	const { selectedTeam } = useUserContext();
	const { getTeam, loading } = useGetTeamInfoHook();
	useEffect(() => {
		const data = getTeam(selectedTeam._id);
		setTeam(data);
	}, [selectedTeam]);

	// need to fetch only if there is a team

	if (loading) {
		return <Spinner />;
	}
	return (
		<div className="flex flex-col flex-1 p-2 gap-2 bg-sky-50">
			<Link
				to="/tasks/dashboard"
				className=" text-sm font-bold opacity-55"
			>
				{"> "}Dashboard
			</Link>
			<h2 className="font-semibold text-sm sm:text-md opacity-80 bg-white p-1">
				{selectedTeam?.teamName}
			</h2>
			<section className="p-1 flex flex-col gap-2">
				<div className="flex gap-2 items-center font-semibold ">
					<div className="bg-blue-400 text-white p-2 rounded-full">
						<MdGroup />
					</div>
					<h2 className="opacity-65 flex-1 md:flex-none ">Members</h2>
					<button
						onClick={() => setAddNewMember((prev) => !prev)}
						className=" bg-green-500 px-2 py-1 ml-10 rounded-md"
					>
						<MdGroupAdd className="text-white" />
					</button>
				</div>
				<ul className="ml-2 p-2 text-sm sm:text-md bg-white">
					{selectedTeam?.members?.map((member) => (
						<li key={i}>{member.userName}</li>
					))}
				</ul>
			</section>
			<section className="p-1">
				<div className="flex gap-2 items-center font-semibold ">
					<div className="bg-orange-400 text-white p-2 rounded-full">
						<FaTasks />
					</div>
					<h2 className="opacity-65 flex-1 md:flex-none">Tasks</h2>
					<button
						onClick={() => setAddNewTask((prev) => !prev)}
						className=" bg-green-500 px-2 py-1 ml-16 rounded-md"
					>
						<MdAddTask className="text-white" />
					</button>
				</div>
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
				<TeamTaskTable selectedOption={selectedOption} />
			</section>
			{addNewMember && (
				<AddTeamMember setAddNewMember={setAddNewMember} />
			)}
			{addNewTask && <AddNewTask setAddNewTask={setAddNewTask} />}
		</div>
	);
};

export default TeamContainer;
