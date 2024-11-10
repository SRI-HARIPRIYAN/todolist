import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(
		() => JSON.parse(localStorage.getItem("user")) || null
	);
	const [userTeams, setUserTeams] = useState(
		() => JSON.parse(localStorage.getItem("userTeams")) || null
	);
	const [userTasks, setUserTasks] = useState(
		() => JSON.parse(localStorage.getItem("userTasks")) || null
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

	const contextValue = {
		user,
		userTeams,
		userTasks,
		setUser,
		setUserTasks,
		setUserTeams,
	};
	return (
		<UserContext.Provider value={contextValue}>
			{children}
		</UserContext.Provider>
	);
};

export const useUserContext = () => useContext(UserContext);
