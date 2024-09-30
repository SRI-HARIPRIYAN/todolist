import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("userInfo")
	? localStorage.getItem("userInfo")
	: {
			user: null,
			isAuthenticated: false,
			loading: false,
			error: null,
	  };
const userSlice = createSlice({
	name: "userInfo",
	initialState,
	reducers: {
		loginSuccess: (state, action) => {
			state.user = action.payload;
			state.isAuthenticated = true;
			localStorage.setItem("userInfo", JSON.stringify(state.user));
		},
		logoutSuccess: (state) => {
			state.user = action.payload;
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		setError: (state, action) => {
			state.error = action.payload;
		},
	},
});

export const { loginSuccess, logoutSuccess, setLoading, setError } =
	userSlice.actions;
export default userSlice.reducer;
