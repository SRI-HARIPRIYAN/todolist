import { useState } from "react";
import { useUserContext } from "../../context.jsx";
import { BACKEND_URL } from "../../constant.js";
import { toast } from "react-toastify";
import useGetTasksHook from "./useGetTasksHook.js";
const useDeleteTaskHook = () => {
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const { getTasks } = useGetTasksHook();
	const deleteTask = async (taskId) => {
		setLoading(true);
		try {
			const res = await fetch(`${BACKEND_URL}/tasks/${taskId}`, {
				method: "DELETE",
				headers: { "Content-Type": "Application/json" },
				credentials: "include",
			});
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error || "Something went wrong");
			} else {
				await getTasks();
				toast.success("Task deleted ");
			}
		} catch (error) {
			console.log("Error in deleteTask:", error);
			setError(error.message);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};
	return { deleteTask, loading, error };
};

export default useDeleteTaskHook;
