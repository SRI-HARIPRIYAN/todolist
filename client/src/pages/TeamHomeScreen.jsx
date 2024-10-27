import React, { useState } from "react";
import TeamList from "../components/teams/TeamList";
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
				<TeamList
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
