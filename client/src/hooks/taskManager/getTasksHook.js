import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "../../slices/taskSlice.js";

export const useFetchTasks = () => {
	const dispatch = useDispatch();
	const { tasks, loading, error } = useSelector((state) => state.tasks);

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				console.log("gettask start");
				const response = await fetch(
					"http://localhost:5000/task/getTasks"
				);
				const data = await response.json();
				dispatch(setTasks(data));
			} catch (error) {
				console.log(error.message);
			} finally {
				console.log("gettaskdone");
			}
		};
		fetchTasks();
	}, [dispatch]);
	return { tasks, loading, error };
};
