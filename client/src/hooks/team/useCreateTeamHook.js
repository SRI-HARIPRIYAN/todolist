import { useState } from "react";
import { BACKEND_URL } from "../../constant.js";
import { useUserContext } from "../../context.jsx";
import { toast } from "react-toastify";
const useCreateTeamHook = () => {
	const [loading, setLoading] = useState(false);
	const { setUserTeams } = useUserContext();
	const createTeam = async (teamName) => {
		setLoading(true);
		try {
			const response = await fetch(`${BACKEND_URL}/teams/new`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ teamName }),
				credentials: "include",
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
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};
	return { createTeam, loading };
};

export default useCreateTeamHook;
