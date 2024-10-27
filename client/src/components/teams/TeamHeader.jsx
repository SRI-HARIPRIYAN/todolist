import React from "react";
import { HiArrowSmRight } from "react-icons/hi";

const TeamHeader = ({ setIsAsideClicked }) => {
	return (
		<header className="flex items-center relative font-semibold bg-sky-300 h-10">
			<button
				className="md:hidden bg-sky-500 text-white absolute left-2 px-1 rounded-sm"
				onClick={() => setIsAsideClicked((prev) => !prev)}
			>
				<HiArrowSmRight className="inline-block text-2xl " />
				All teams
			</button>

			<h1 className="flex-grow text-center">
				Teams <span></span>
			</h1>
		</header>
	);
};

export default TeamHeader;
