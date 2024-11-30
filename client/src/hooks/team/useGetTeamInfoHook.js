import { useState } from "react";
import { BACKEND_URL } from "../../constant.js";
import { useUserContext } from "../../context.jsx";
import { toast } from "react-toastify";
const useGetTeamInfoHook = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const { setUserTeams } = useUserContext();
	const getTeam = async (selectedTeam) => {
		if (selectedTeam) {
			setLoading(true);
			try {
				const response = await fetch(
					`${BACKEND_URL}/teams/${selectedTeam}`,
					{
						method: "GET",
						headers: { "Content-Type": "application/json" },
						credentials: "include",
					}
				);
				const data = await response.json();
				if (!response.ok) {
					throw new Error(data.error || "Unable to get team");
				} else {
					console.log(data);
					return data;
				}
			} catch (error) {
				console.log("Error in get team: ", error);
				setError(error);
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		} else {
			toast.info("Create a team to collaborate");
		}
	};
	return { getTeam, loading, error };
};

export default useGetTeamInfoHook;
