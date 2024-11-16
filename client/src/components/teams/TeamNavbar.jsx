import React, { useState } from "react";
import { HiArrowSmLeft } from "react-icons/hi";
import { MdGroups } from "react-icons/md";
import CreateTeam from "./CreateTeam";
import { useUserContext } from "../../context";
const TeamNavbar = ({ setSelectedTeam, isAsideClicked, setIsAsideClicked }) => {
	const { userTeams } = useUserContext();
	const [createTeam, setCreateTeam] = useState(false);
	return (
		<nav
			className={` absolute md:relative  ${
				isAsideClicked ? "left-0" : "left-[-1000px]"
			} md:left-0 duration-300 ease-in-out top-0  w-[40%] md:w-1/6 z-10 bg-slate-100 text-sm h-screen `}
		>
			<button
				className="w-full text-center h-10 bg-sky-500 md:hidden"
				onClick={() => setIsAsideClicked((prev) => !prev)}
			>
				<HiArrowSmLeft className="inline text-2xl text-white" />
			</button>

			<h2 className=" text-black text-center font-semibold bg-slate-300 p-2  h-10">
				<MdGroups className="inline text-xl mr-2" />
				My teams
			</h2>

			<ul className="flex flex-col  font-semibold text-center">
				{userTeams?.map((team) => (
					<li
						onClick={() => {
							setSelectedTeam(team._id);
							setIsAsideClicked(false);
						}}
						className="bg-slate-100 p-2 border-b-2 cursor-pointer opacity-65"
						key={team._id}
					>
						{team.teamName}
					</li>
				))}
			</ul>
			<button
				onClick={() => setCreateTeam((prev) => !prev)}
				className=" text-green-500 text-center font-semibold bg-slate-200 p-2 w-full h-10"
			>
				<MdGroups className="inline text-xl mr-2" />
				Create
			</button>
			{createTeam && <CreateTeam setCreateTeam={setCreateTeam} />}
		</nav>
	);
};

export default TeamNavbar;
