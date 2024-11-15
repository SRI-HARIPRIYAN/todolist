import { useState } from "react";
import { BACKEND_URL } from "../../constant";
import useUserContext from "../../context.js";
import { toast } from "react-toastify";
const useCreateTeamHook = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const { setUserTeams } = useUserContext();
	const createTeam = async (team) => {
		setLoading(true);
		try {
			const response = await fetch(`${BACKEND_URL}/teams/new`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ team }),
			});
			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.error || "Unable to create team");
			} else {
				setUserTeams((prev) => [...prev, data]);
				toast.success("Team created");
			}
		} catch (error) {
			console.log("Error in create team: ", error);
			setError(error);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};
	return { createTeam, loading, error };
};

export default useCreateTeamHook;
