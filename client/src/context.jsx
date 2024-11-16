import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(
		() => JSON.parse(localStorage.getItem("user")) || null
	);
	const [userTeams, setUserTeams] = useState(
		() => JSON.parse(localStorage.getItem("userTeams")) || []
	);
	const [userTasks, setUserTasks] = useState(
		() => JSON.parse(localStorage.getItem("userTasks")) || []
	);
	const [selectedTeam, setSelectedTeam] = useState(
		() => JSON.parse(localStorage.getItem("selectedTeam")) || null
	);

	useEffect(() => {
		localStorage.setItem("user", JSON.stringify(user));
	}, [user]);
	useEffect(() => {
		localStorage.setItem("userTeams", JSON.stringify(userTeams));
	}, [userTeams]);
	useEffect(() => {
		localStorage.setItem("userTasks", JSON.stringify(userTasks));
	}, [userTasks]);
	useEffect(() => {
		localStorage.setItem("selectedTeam", JSON.stringify(selectedTeam));
	}, [selectedTeam]);

	const contextValue = {
		user,
		userTeams,
		userTasks,
		selectedTeam,
		setUser,
		setUserTasks,
		setUserTeams,
		setSelectedTeam,
	};
	return (
		<UserContext.Provider value={contextValue}>
			{children}
		</UserContext.Provider>
	);
};

export const useUserContext = () => useContext(UserContext);
