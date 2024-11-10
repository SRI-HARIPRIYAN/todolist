import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/loginscreen.jpg";
import useSignUpHook from "../hooks/user/useSignUpHook";
const SignupScreen = () => {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");

	const navigate = useNavigate();
	const { signUp } = useSignUpHook();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await signUp(userName, email, password);
		navigate("/tasks/dashboard");
	};

	const handleGoogleAuth = () => {
		try {
			window.location.href = "http://localhost:5000/auth/google/callback";
		} catch (error) {
			console.log(error?.message);
		}
	};

	return (
		<div
			className={` w-screen h-screen  grid grid-cols-1 sm:grid-cols-2`}
			style={{
				background: `url(${loginImage})`,
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
			}}
		>
			<section className="relative flex justify-center items-center flex-col">
				<h1 className="text-2xl sm:text-3xl">Sign Up</h1>
				<form className=" border-2 border-yellow-700 flex flex-col gap-3 p-5">
					<input
						type="text"
						name="userName"
						placeholder="Username "
						className=" h-10 pl-2 rounded-md "
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
					/>
					<input
						type="email"
						name="email"
						placeholder="E-mail"
						className=" h-10 pl-2 rounded-md "
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="password"
						name="password"
						placeholder="Password"
						className=" h-10 pl-2 rounded-md "
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button
						onClick={handleSubmit}
						className=" bg-blue-300 text-white hover:bg-blue-500"
					>
						Signup
					</button>
				</form>
				<p>or</p>
				<button
					onClick={handleGoogleAuth}
					className="border-2 border-blue-500 px-3 py-2 bg-blue-300 hover:bg-blue-700"
				>
					Signup with google
				</button>
			</section>
			<section
				className="hidden sm:flex items-center justify-center border-2 "
				style={{
					background: `url(${loginImage})`,
				}}
			>
				image
			</section>
		</div>
	);
};

export default SignupScreen;
