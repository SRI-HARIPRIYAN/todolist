import { useState } from "react";
import { useUserContext } from "../../context.jsx";
import { BACKEND_URL } from "../../constant.js";
import { toast } from "react-toastify";
const useGetTeamTasksHook = () => {
	const [loading, setLoading] = useState(false);
	const getTeamTasks = async (teamId) => {
		setLoading(true);
		try {
			const res = await fetch(`${BACKEND_URL}/tasks/${teamId}/team`, {
				method: "GET",
				credentials: "include",
			});
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.message || "Something went wrong");
			} else {
				console.log("team tasks: ", data);
				return data;
			}
		} catch (error) {
			console.log("Error in getTeamTasks:", error);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};
	return { getTeamTasks, loading };
};

export default useGetTeamTasksHook;
