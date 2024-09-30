import { createSlice } from "@reduxjs/toolkit";
const initialState = [];

const taskSlice = createSlice({
	name: "tasks",
	initialState,
	reducers: {
		addTask: (state, action) => {
			state.tasks.push(action.payload);
		},
		removeTask: (state, action) => {
			state.tasks = state.tasks.filter(
				(task) => task._id === action.payload._id
			);
		},
		updateTask: (state, action) => {
			const index = state.tasks.findIndex(
				(task) => task._id === action.payload._id
			);
		},
		setTasks: (state, action) => {
			state.tasks = action.payload;
		},
	},
});

export const { addTask, removeTask, updateTask, setTasks } = taskSlice.actions;
export default taskSlice.reducer;
