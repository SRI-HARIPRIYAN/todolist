import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import LoginScreen from "./pages/LoginScreen.jsx";
import SignupScreen from "./pages/SignupScreen.jsx";
import HomeScreen from "./pages/HomeScreen.jsx";
import TaskHomeScreen from "./pages/TaskHomeScreen.jsx";
import TeamHomeScreen from "./pages/TeamHomeScreen.jsx";
import TaskDashboard from "./components/tasks/TaskDashboard.jsx";
import AllTasks from "./components/tasks/AllTasks.jsx";
import TaskReport from "./components/report/TaskReport.jsx";
import { useUserContext } from "./context.jsx";
const App = () => {
	const { user } = useUserContext();

	return (
		<Routes>
			<Route path="/" element={<HomeScreen />} />
			{!user && (
				<>
					<Route path="/login" element={<LoginScreen />} />
					<Route path="/signup" element={<SignupScreen />} />
				</>
			)}

			{user && (
				<Route path="/tasks" element={<TaskHomeScreen />}>
					<Route path="dashboard" element={<TaskDashboard />} />
					<Route path="all" element={<AllTasks />} />
					<Route path="summary" element={<TaskReport />} />
				</Route>
			)}
			{user && <Route path="/myteam" element={<TeamHomeScreen />} />}
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
};

export default App;
