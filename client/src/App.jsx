import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import LoginScreen from "./pages/LoginScreen.jsx";
import SignupScreen from "./pages/SignupScreen.jsx";
import HomeScreen from "./pages/HomeScreen.jsx";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<HomeScreen />} />
			<Route path="/login" element={<LoginScreen />} />
			<Route path="/signup" element={<SignupScreen />} />
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
};

export default App;
