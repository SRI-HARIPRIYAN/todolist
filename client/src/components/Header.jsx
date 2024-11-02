import React from "react";
import { MdElectricBolt } from "react-icons/md";
import { MdOutlinePerson } from "react-icons/md";
const Header = ({ setIsOpen }) => {
	return (
		<div className="h-10 bg-sky-600 flex items-center px-2 ">
			<button
				onClick={() => setIsOpen((prev) => !prev)}
				className=" flex flex-col gap-0.5 justify-center items-center p-3 h-full w-10"
			>
				<div className=" bg-white w-full h-[3px] rounded-sm"></div>
				<div className=" bg-white w-full h-[3px] rounded-sm"></div>
				<div className=" bg-white w-full h-[3px] rounded-sm"></div>
			</button>
			<button className="bg-sky-300 h-fit px-3 py-1 rounded-sm text-white font-bold text-sm">
				<MdElectricBolt className="text-white inline-block mr-1.5" />
				New Task
			</button>
			<div className=" ml-auto text-white font-bold">
				<div className="inline border-2 rounded-full p-1 mr-2">
					<MdOutlinePerson className="inline-block   text-xl" />
				</div>
				<span>Hello User</span>
			</div>
		</div>
	);
};

export default Header;
