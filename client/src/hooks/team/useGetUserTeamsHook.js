import { useState } from "react";
import { BACKEND_URL } from "../../constant.js";
import useUserContext from "../../context.jsx";
import { toast } from "react-toastify";
const useGetUserTeamsHook = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const { setUserTeams } = useUserContext();
	const getTeams = async (team) => {
		setLoading(true);
		try {
			const response = await fetch(`${BACKEND_URL}/teams`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			});
			const data = await response.json();
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
