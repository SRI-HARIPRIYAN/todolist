import React, { useEffect, useState } from "react";
import TeamNavbar from "../components/teams/TeamNavbar";
import TeamHeader from "../components/teams/TeamHeader";
import TeamContainer from "../components/teams/TeamContainer";
import useGetUserTeamsHook from "../hooks/team/useGetUserTeamsHook";
import Spinner from "../components/Spinner.jsx";
import { useUserContext } from "../context.jsx";
const TeamHomeScreen = () => {
	const [isAsideClicked, setIsAsideClicked] = useState(false);
	const [selectedTeam, setSelectedTeam] = useState(null);
	const { getTeams, loading } = useGetUserTeamsHook();
	const { userTeams } = useUserContext();
	useEffect(() => {
		getTeams();
		setSelectedTeam(userTeams[0] ? userTeams[0]._id : null);
	}, []);
	if (loading) return <Spinner />;
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
