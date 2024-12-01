import { useState } from "react";
import { BACKEND_URL } from "../../constant.js";
import { useUserContext } from "../../context.jsx";
import { toast } from "react-toastify";
const useGetUserTeamsHook = () => {
	const [loading, setLoading] = useState(false);
	const { setUserTeams, userTeams, setSelectedTeam } = useUserContext();
	const getTeams = async () => {
		setLoading(true);
		try {
			const response = await fetch(`${BACKEND_URL}/teams`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
			});
			const data = await response.json();
			setSelectedTeam(userTeams[0] || data[0] || null);
			if (!response.ok) {
				throw new Error(data.error || "Unable to get teams");
			} else {
				setUserTeams(data);
			}
		} catch (error) {
			console.log("Error in get all teams: ", error);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};
	return { getTeams, loading };
};

export default useGetUserTeamsHook;
