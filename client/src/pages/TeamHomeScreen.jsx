import React, { useState } from "react";
import TeamNavbar from "../components/teams/TeamNavbar";
import TeamHeader from "../components/teams/TeamHeader";
import TeamContainer from "../components/teams/TeamContainer";
const TeamHomeScreen = () => {
	const [isAsideClicked, setIsAsideClicked] = useState(false);
	const [selectedTeam, setSelectedTeam] = useState(null);
	console.log(isAsideClicked);
	return (
		<div className="relative">
			<TeamHeader setIsAsideClicked={setIsAsideClicked} />

			<section className=" sm:flex md:flex-1">
				<TeamNavbar
					setSelectedTeam={setSelectedTeam}
					isAsideClicked={isAsideClicked}
					setIsAsideClicked={setIsAsideClicked}
				/>
				<TeamContainer teamId={selectedTeam} />
			</section>
		</div>
	);
};

export default TeamHomeScreen;
