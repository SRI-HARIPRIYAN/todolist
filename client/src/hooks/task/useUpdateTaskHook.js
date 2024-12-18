import { useState } from "react";
import { useUserContext } from "../../context.jsx";
import { BACKEND_URL } from "../../constant.js";
import { toast } from "react-toastify";

const useUpdateTaskHook = () => {
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const { user, setUserTasks } = useUserContext();
	const updateTask = async (taskId, updatedTask) => {
		setLoading(true);
		try {
			const res = await fetch(`${BACKEND_URL}/tasks/${taskId}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(updatedTask),
				credentials: "include",
			});
			const data = await res.json();
			if (!res.ok) {
				console.log(data.error);
				throw new Error(data.error || "Something went wrong");
			} else {
				setUserTasks((prevTasks) =>
					prevTasks.map((task) =>
						task._id === taskId ? { ...task, updatedTask } : task
					)
				);
				toast.success("Task updated successfully ");
			}
		} catch (error) {
			console.log("Error in updateTask:", error);
			setError(error.message);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};
	return { updateTask, loading, error };
};

export default useUpdateTaskHook;
