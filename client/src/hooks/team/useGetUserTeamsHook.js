import { useState } from "react";
import { BACKEND_URL } from "../../constant.js";
import { useUserContext } from "../../context.jsx";
import { toast } from "react-toastify";
const useGetUserTeamsHook = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const { setUserTeams, setSelectedTeam } = useUserContext();
	const getTeams = async () => {
		setLoading(true);
		try {
			const response = await fetch(`${BACKEND_URL}/teams`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
			});
			const data = await response.json();
			setSelectedTeam(data[0] || null);
			if (!response.ok) {
				throw new Error(data.error || "Unable to get teams");
			} else {
				setUserTeams(data);
			}
		} catch (error) {
			console.log("Error in get all teams: ", error);
			setError(error);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};
	return { getTeams, loading, error };
};

export default useGetUserTeamsHook;
