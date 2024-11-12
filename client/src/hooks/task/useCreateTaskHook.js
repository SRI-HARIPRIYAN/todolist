import { useState } from "react";
import { useUserContext } from "../../context.jsx";
import { BACKEND_URL } from "../../constant.js";
import { toast } from "react-toastify";

const useCreateTaskHook = () => {
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const { user, setUserTasks } = useUserContext();
	const createTask = async (taskData) => {
		setLoading(true);
		try {
			const res = await fetch(`${BACKEND_URL}/tasks/add`, {
				method: "POST",
				headers: { "Content-Type": "Application/json" },
				body: JSON.stringify({ ...taskData, assignedTo: user._id }),
				credentials: "include",
			});
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error || "Something went wrong");
			} else {
				setUserTasks((prevTasks) => [...prevTasks, data] || data);
				toast.success("Task added ");
			}
		} catch (error) {
			console.log("Error in createTask:", error);
			setError(error.message);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};
	return { createTask, loading, error };
};

export default useCreateTaskHook;
