import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Homescreen from "../assets/Homescreen.png";
const HomeScreen = () => {
	const getUser = async () => {
		try {
			const res = await axios.get(
				`http://localhost:5000/auth/login/success`,
				{
					withCredentials: true,
				}
			);
			console.log(res.data);
			// need to set userdata on context {...res.data.user._json,_id:res.data._id}
		} catch (error) {
			console.log(error);
		}
	};
	/* useEffect(() => {
		try {
			getUser();
		} catch (error) {}
	}, []); */
	return (
		<div
			className="w-screen h-screen bg-no-repeat flex justify-center items-center flex-col px-3"
			style={{
				background: `url(${Homescreen})`,
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<div className=" backdrop-blur-md  border-sky-200 px-4 py-10 border-opacity-60 text-center flex flex-col items-center">
				{/* <img src={taskImage} className="w-2/3" alt="" /> */}
				<p className=" text-2xl sm:text-4xl text-purple-800 font-bold">
					The Most Precious Time is{" "}
					<span className="text-black">NOW</span>
				</p>
				<p className=" indent-6">Do it now or regret it later</p>
				<Link
					to={"/tasks/dashboard"}
					className="bg-blue-300 p-2 hover:bg-blue-500"
				>
					Get started
				</Link>
				<div className="flex gap-2 justify-center">
					<button className="bg-blue-300 p-2">Your Tasks</button>
					<button className="bg-blue-300 p-2">Your Teams</button>
				</div>
			</div>
		</div>
	);
};

export default HomeScreen;
