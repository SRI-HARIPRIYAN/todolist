import { BACKEND_URL } from "../../constant.js";
import { useState } from "react";
import { toast } from "react-toastify";

const useLogoutHook = () => {
	const [loading, setLoading] = useState(false);
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

			[("user", "userTasks", "userTeams", "selectedTeam")].forEach(
				(element) => {
					localStorage.removeItem(element);
				}
			);

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
