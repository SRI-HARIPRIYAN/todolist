import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../slices/taskSlice";

export const useAddTask = () => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const addNewTask = async (task) => {
		try {
			setLoading(true);
			const res = await fetch("http:localhost:5000/task/addNewTask", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(task),
			});
			const newTask = await res.json();
			dispatch(addTask(newTask));
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};
	return { addNewTask, loading, error };
};
