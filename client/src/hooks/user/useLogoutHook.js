import { BACKEND_URL } from "../../constant.js";
import { useState } from "react";
import { toast } from "react-toastify";
import { useUserContext } from "../../context.jsx";
const useLogoutHook = () => {
	const [loading, setLoading] = useState(false);

	const { setUser, setUserTeams, setUserTasks, setSelectedTeam } =
		useUserContext();
	const logout = async () => {
		try {
			setLoading(true);
			const response = await fetch(`${BACKEND_URL}/api/auth/logout`, {
				method: "POST",
				credentials: "include",
			});
			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.error || "Logout failed");
			}

			setUser(null);
			setSelectedTeam(null);
			setUserTasks([]);
			setUserTeams([]);
			toast.success(data.message);
		} catch (error) {
			toast.error(error?.message || error);
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	return { logout, loading };
};

export default useLogoutHook;
