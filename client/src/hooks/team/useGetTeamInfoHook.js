import { useState } from "react";
import { BACKEND_URL } from "../../constant.js";
import { toast } from "react-toastify";
import { useUserContext } from "../../context.jsx";
const useGetTeamInfoHook = () => {
	const [loading, setLoading] = useState(false);

	const { selectedTeam, setSelectedTeam } = useUserContext();
	const getTeam = async () => {
		if (selectedTeam) {
			setLoading(true);
			try {
				const response = await fetch(
					`${BACKEND_URL}/teams/${selectedTeam._id}`,
					{
						method: "GET",
						credentials: "include",
					}
				);
				const data = await response.json();
				if (!response.ok) {
					throw new Error(data.error || "Unable to get team");
				} else {
					console.log(data);
					setSelectedTeam(data);
				}
			} catch (error) {
				console.log("Error in get team: ", error);
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		} else {
			toast.info("Create a team to collaborate");
		}
	};
	return { getTeam, loading };
};

export default useGetTeamInfoHook;
