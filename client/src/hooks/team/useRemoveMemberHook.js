import { useState } from "react";
import { BACKEND_URL } from "../../constant.js";
import { toast } from "react-toastify";
import useGetTeamInfoHook from "./useGetTeamInfoHook.js";
import { useUserContext } from "../../context.jsx";
import useGetTeamTasksHook from "../task/useGetTeamTasksHook.js";
const useRemoveMemberHook = () => {
	const [loading, setLoading] = useState(false);
	const { getTeam } = useGetTeamInfoHook();
	const { getTeamTasks } = useGetTeamTasksHook();
	const { selectedTeam, setSelectedTeam } = useUserContext();
	const removeMember = async (memberId) => {
		setLoading(true);
		try {
			console.log(" member id: ", memberId);
			const response = await fetch(
				`${BACKEND_URL}/teams/${selectedTeam._id}/members`,
				{
					method: "DELETE",
					credentials: "include",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ memberId }),
				}
			);
			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.error || "Unable to remove member");
			} else {
				setSelectedTeam(data);
				getTeam();
				getTeamTasks(selectedTeam?._id);
				toast.success("User removed");
			}
		} catch (error) {
			console.log("Error in remove member hook: ", error);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};
	return { removeMember, loading };
};

export default useRemoveMemberHook;
