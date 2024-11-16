import { useState } from "react";
import { BACKEND_URL } from "../../constant.js";
import { useUserContext } from "../../context.jsx";
import { toast } from "react-toastify";
import useGetUserTeamsHook from "./useGetUserTeamsHook.js";
const useDeleteTeamHook = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const { setUserTeams, userTeams } = useUserContext();
	const { getTeams } = useGetUserTeamsHook();
	const deleteTeam = async (teamId) => {
		setLoading(true);
		try {
			const response = await fetch(`${BACKEND_URL}/teams/${teamId}`, {
				method: "DELETE",
				credentials: "include",
			});
			if (!response.ok) {
				throw new Error(data.error || "Unable to delete team");
			} else {
				/* let correctedTeams = userTeams.filter(
					(team) => team._id !== teamId
				);
				setUserTeams(correctedTeams); */
				await getTeams();
				toast.success("Team deleted");
			}
		} catch (error) {
			console.log("Error in delete team: ", error);
			setError(error);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};
	return { deleteTeam, loading, error };
};

export default useDeleteTeamHook;
