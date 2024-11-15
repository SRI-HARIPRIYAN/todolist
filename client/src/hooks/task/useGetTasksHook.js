import { useState } from "react";
import { useUserContext } from "../../context.jsx";
import { BACKEND_URL } from "../../constant.js";
import { toast } from "react-toastify";

const useGetTasksHook = () => {
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const { user, setUserTasks } = useUserContext();
	const getTasks = async () => {
		setLoading(true);
		try {
			const res = await fetch(`${BACKEND_URL}/tasks`, {
				method: "GET",
				credentials: "include",
			});
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error || "Something went wrong");
			} else {
				setUserTasks(data);
			}
		} catch (error) {
			console.log("Error in getTasks hook :", error);
			setError(error.message);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};
	return { getTasks, loading, error };
};

export default useGetTasksHook;
