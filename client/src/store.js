import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slices/taskSlice.js";
import userReducer from "./slices/userSlice.js";
const store = configureStore({
	reducer: {
		tasks: taskReducer,
		user: userReducer,
	},
	devTools: true,
});

export default store;
