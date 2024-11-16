import React from "react";
import { Link } from "react-router-dom";
import { HiArrowSmLeft } from "react-icons/hi";
import { MdGroups } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { MdOutlineEditNote } from "react-icons/md";
import { TbReport } from "react-icons/tb";
const Navbar = ({ isOpen, setIsOpen }) => {
	return (
		<section
			className={` absolute md:relative ${
				isOpen ? "left-0" : "left-[-1000px]"
			} md:left-0 duration-300 ease-in-out top-0  w-[40%] h-screen md:w-1/6 z-10 bg-white text-sm overflow-y-clip `}
		>
			<button
				className="w-full text-center h-10 bg-sky-500 md:hidden"
				onClick={() => setIsOpen((prev) => !prev)}
			>
				<HiArrowSmLeft className="inline text-2xl text-white" />
			</button>
			<h2
				className={`hidden md:block text-white bg-sky-700 text-center font-semibold  p-2  h-10`}
			>
				TASKING
			</h2>
			<nav className="bg-gray-700 ">
				<h2 className="text-gray-400 text-sm py-2 bg-slate-800">
					NAVIGATION
				</h2>
				<ul className="flex flex-col h-screen font-normal text-white">
					<li className=" px-2 py-4 cursor-pointer ">
						<Link to={"dashboard"}>
							<MdSpaceDashboard className="inline mr-2 text-xl" />
							Dashboard
						</Link>
					</li>
					<li className=" px-2 py-4 cursor-pointer ">
						<Link to={"all"}>
							<MdOutlineEditNote className="inline mr-2 text-xl" />
							All tasks
						</Link>
					</li>
					<li className=" px-2 py-4 cursor-pointer ">
						<Link to={"/myteam"}>
							<MdGroups className="inline mr-2 text-xl" />
							My Teams
						</Link>
					</li>
					<li className=" px-2 py-4 cursor-pointer  ">
						<Link to="summary">
							<TbReport className="inline- mr-2 text-xl" />
							Monthly report
						</Link>
					</li>
				</ul>
			</nav>
		</section>
	);
};

export default Navbar;
