import { useState } from "react";
import { BACKEND_URL } from "../../constant.js";
import { toast } from "react-toastify";
import useGetUserTeamsHook from "./useGetUserTeamsHook.js";
const useAddMemberHook = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const { getTeams } = useGetUserTeamsHook();
	const addMember = async (teamId, members) => {
		setLoading(true);
		try {
			const response = await fetch(
				`${BACKEND_URL}/teams/${teamId}/members`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ members }),
					credentials: "include",
				}
			);
			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.error || "Unable to add member");
			} else {
				await getTeams();
				toast.success("member added");
			}
		} catch (error) {
			console.log("Error in add member: ", error);
			setError(error);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};
	return { addMember, loading, error };
};

export default useAddMemberHook;
