import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import loginImage from "../assets/loginscreen.jpg";
import useSignUpHook from "../hooks/user/useSignUpHook";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
const SignupScreen = () => {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");

	const navigate = useNavigate();
	const { signUp, loading } = useSignUpHook();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await signUp(userName, email, password);
		navigate("/tasks/dashboard");
		toast.success("Signed in successfully");
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
						autoComplete="name"
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
						autoComplete="your password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button
						type="submit"
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
				<p>Already an user?</p>
				<Link className="inline text-white" to="/login">
					Login
				</Link>
				{loading && <Spinner />}
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
