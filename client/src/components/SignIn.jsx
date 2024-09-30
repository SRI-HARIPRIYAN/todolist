import React, { useState } from "react";
import useSignUp from "../hooks/userManager/useSignUpHook.js";
const SignIn = ({ setIsSignUp }) => {
	const { signUp } = useSignUp();
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleSignUp = async () => {
		await signUp(userName, password, confirmPassword);
		setIsSignUp(false);
	};
	return (
		<div className="min-w-screen min-h-screen fixed top-0 left-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
			<div className="bg-white p-8 rounded shadow-md w-96">
				<div className="mb-4">
					<label htmlFor="userName" className="block mb-2">
						Username
					</label>
					<input
						type="text"
						name="userName"
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="password" className="block mb-2">
						Password
					</label>
					<input
						type="password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>
				<div className="mb-4">
					<label htmlFor="confirmPassword" className="block mb-2">
						Confirm Password
					</label>
					<input
						type="password"
						name="confirmPassword"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						className="w-full p-2 border border-gray-300 rounded"
					/>
				</div>
				<button
					onClick={handleSignUp}
					className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
				>
					Sign Up
				</button>
			</div>
		</div>
	);
};

export default SignIn;
