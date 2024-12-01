import React, { useEffect, useState } from "react";
import TeamNavbar from "../components/teams/TeamNavbar";
import TeamHeader from "../components/teams/TeamHeader";
import TeamContainer from "../components/teams/TeamContainer";
import useGetUserTeamsHook from "../hooks/team/useGetUserTeamsHook";
import Spinner from "../components/Spinner.jsx";
const TeamHomeScreen = () => {
	const [isAsideClicked, setIsAsideClicked] = useState(false);
	const { getTeams, loading } = useGetUserTeamsHook();
	useEffect(() => {
		getTeams();
	}, []);
	if (loading) return <Spinner />;
	return (
		<div className="relative">
			<TeamHeader setIsAsideClicked={setIsAsideClicked} />
			<section className=" sm:flex md:flex-1">
				<TeamNavbar
					isAsideClicked={isAsideClicked}
					setIsAsideClicked={setIsAsideClicked}
				/>
				<TeamContainer />
			</section>
		</div>
	);
};

export default TeamHomeScreen;
