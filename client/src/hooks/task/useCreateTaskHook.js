import { useState } from "react";
import { useUserContext } from "../../context.jsx";
import { BACKEND_URL } from "../../constant.js";
import { toast } from "react-toastify";

const useCreateTaskHook = () => {
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const { setUserTasks } = useUserContext();
	const createTask = async (taskData) => {
		setLoading(true);
		try {
			console.log("taskData: " + taskData);
			const res = await fetch(`${BACKEND_URL}/tasks/add`, {
				method: "POST",
				headers: { "Content-Type": "Application/json" },
				body: JSON.stringify(taskData),
				credentials: "include",
			});
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.message || "Something went wrong");
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
