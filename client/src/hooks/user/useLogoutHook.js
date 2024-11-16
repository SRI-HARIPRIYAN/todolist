import { BACKEND_URL } from "../../constant.js";
import { useUserContext } from "../../context.jsx";
import { useState } from "react";
import { toast } from "react-toastify";

const useLogoutHook = () => {
	const [loading, setLoading] = useState(false);
	const { setUser, setUserTeams, setUserTasks } = useUserContext();
	const logout = async () => {
		try {
			const start = Date.now();
			setLoading(true);
			const response = await fetch(`${BACKEND_URL}/api/auth/logout`, {
				method: "POST",
				credentials: "include",
			});
			console.log("Fetch completed in", Date.now() - start, "ms");
			const data = await response.json();
			console.log("Data parsed in", Date.now() - start, "ms");
			if (!response.ok) {
				throw new Error(data.error || "Logout failed");
			}
			setUser(null);
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
