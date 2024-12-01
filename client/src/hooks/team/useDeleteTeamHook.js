import { useState } from "react";
import { BACKEND_URL } from "../../constant.js";
import { useUserContext } from "../../context.jsx";
import { toast } from "react-toastify";
import useGetUserTeamsHook from "./useGetUserTeamsHook.js";
const useDeleteTeamHook = () => {
	const [loading, setLoading] = useState(false);
	const { setUserTeams } = useUserContext();
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
				setUserTeams((prevTeams) =>
					prevTeams.filter((team) => team._id !== teamId)
				);
				toast.success("Team deleted");
			}
		} catch (error) {
			console.log("Error in delete team: ", error);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};
	return { deleteTeam, loading };
};

export default useDeleteTeamHook;
