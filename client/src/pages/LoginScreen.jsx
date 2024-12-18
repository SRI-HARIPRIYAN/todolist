import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../assets/loginscreen.jpg";
import useLoginHook from "../hooks/user/useLoginHook";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
const LoginScreen = () => {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const { login, loading } = useLoginHook();
	const navigate = useNavigate();
	const handleGoogleAuth = () => {
		try {
			window.location.href = "http://localhost:5000/auth/google/callback";
		} catch (error) {
			console.log(error?.message);
		}
	};
	const handleLogin = async (e) => {
		e.preventDefault();
		await login(userName, password);
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
				<h1 className="text-2xl sm:text-3xl">Login</h1>
				<form className=" border-2 border-yellow-700 flex flex-col gap-3 p-5">
					<input
						type="text"
						name="userName"
						placeholder="Username / E-mail"
						className=" h-10 pl-2 rounded-md "
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
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
						onClick={handleLogin}
						className=" bg-blue-300 text-white hover:bg-blue-500"
					>
						login
					</button>
				</form>
				<p>or</p>
				<button
					onClick={handleGoogleAuth}
					className="border-2 border-blue-500 px-3 py-2 bg-blue-300 hover:bg-blue-700"
				>
					google
				</button>
				<p className="text-white text-sm ">New here?</p>
				<Link
					className=" inline text-blue-400 font-bold"
					to={"/signup"}
				>
					Register
				</Link>
			</section>
			{loading && <Spinner />}
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

export default LoginScreen;
