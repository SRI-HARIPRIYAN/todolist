import React from "react";
import { Link } from "react-router-dom";
import Homescreen from "../assets/Homescreen.png";
import taskImage from "../assets/taskhand.png";
const HomeScreen = () => {
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
			<div className=" backdrop-blur-md  border-sky-200 p-2 border-opacity-60 text-center flex flex-col items-center">
				<img src={taskImage} className="w-2/3" alt="" />
				<p className=" text-2xl sm:text-4xl text-purple-800 font-bold">
					The Most Precious Time is{" "}
					<span className="text-black">NOW</span>
				</p>
				<p className=" indent-6">Do it now or regret it later</p>
				<Link
					to={"/login"}
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
