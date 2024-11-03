import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import LoginScreen from "./pages/LoginScreen.jsx";
import SignupScreen from "./pages/SignupScreen.jsx";
import HomeScreen from "./pages/HomeScreen.jsx";
import TaskDashboard from "./pages/TaskDashboard.jsx";
import TeamHomeScreen from "./pages/TeamHomeScreen.jsx";
import NewTask from "./components/tasks/NewTask.jsx";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<HomeScreen />} />
			<Route path="/task/new" element={<NewTask />} />
			<Route path="/login" element={<LoginScreen />} />
			<Route path="/signup" element={<SignupScreen />} />
			<Route path="/dashboard" element={<TaskDashboard />} />
			<Route path="/myteam" element={<TeamHomeScreen />} />
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
};

export default App;
