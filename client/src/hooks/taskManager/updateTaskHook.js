import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask } from "../../slices/taskSlice";

export const useUpdateTask = () => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const updateExistingTask = async (task) => {
		try {
			setLoading(true);
			const response = await fetch(
				`http://localhost:5000/task/${task._id}`,
				{
					method: "PATCH",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(task),
				}
			);
			const updatedTask = await response.json();
			dispatch(updateTask(updatedTask));
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return { updateExistingTask, loading, error };
};
