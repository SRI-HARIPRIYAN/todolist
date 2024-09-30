import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeTask } from "../../slices/taskSlice";

export const useDeleteTask = () => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const deleteTask = async (taskId) => {
		try {
			setLoading(true);
			await fetch(`http://localhost:5000/task/${taskId}`, {
				method: "DELETE",
			});
			dispatch(removeTask(taskId));
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return { deleteTask, loading, error };
};
