import { useState } from "react";
import { BACKEND_URL } from "../../constant.js";
import { toast } from "react-toastify";
import { useUserContext } from "../../context";
import useGetTeamInfoHook from "./useGetTeamInfoHook.js";
const useAddMemberHook = () => {
	const [loading, setLoading] = useState(false);
	const { selectedTeam } = useUserContext();
	const { getTeam } = useGetTeamInfoHook();
	const addMember = async (member) => {
		setLoading(true);
		try {
			console.log(member);
			const response = await fetch(
				`${BACKEND_URL}/teams/${selectedTeam._id}/members`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ memberName: member }),
					credentials: "include",
				}
			);
			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.error || "Unable to add member");
			} else {
				await getTeam(selectedTeam._id);
				toast.success("member added");
			}
		} catch (error) {
			console.log("Error in add member: ", error);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};
	return { addMember, loading };
};

export default useAddMemberHook;
