import { useState } from "react";
import { BACKEND_URL } from "../../constant.js";
import { toast } from "react-toastify";
import useGetUserTeamsHook from "./useGetUserTeamsHook.js";
const useRemoveMemberHook = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const { getUserTeams } = useGetUserTeamsHook();
	const deleteMember = async (teamId, memberId) => {
		setLoading(true);
		try {
			const response = await fetch(
				`${BACKEND_URL}/teams/${teamId}/members`,
				{
					method: "DELETE",
					credentials: "include",
					body: JSON.stringify({ memberId }),
				}
			);
			if (!response.ok) {
				throw new Error(data.error || "Unable to remove member");
			} else {
				getUserTeams();
				toast.success("User removed");
			}
		} catch (error) {
			console.log("Error in remove member hook: ", error);
			setError(error);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};
	return { deleteMember, loading, error };
};

export default useRemoveMemberHook;
