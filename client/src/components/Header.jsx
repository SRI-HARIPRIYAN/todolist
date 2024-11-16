import React, { useState } from "react";
import { MdOutlinePerson } from "react-icons/md";
import { useUserContext } from "../context";
import useLogoutHook from "../hooks/user/useLogoutHook";
import Spinner from "./Spinner";
const Header = ({ setIsOpen }) => {
	const { user } = useUserContext();
	const [showLogout, setShowLogout] = useState(false);
	const { logout, loading } = useLogoutHook();

	const handleLogout = async () => {
		await logout();
	};
	if (loading) {
		return <Spinner />;
	}
	return (
		<div className=" h-10 bg-sky-600 flex items-center px-2 ">
			<button
				onClick={() => setIsOpen((prev) => !prev)}
				className=" flex flex-col gap-0.5 justify-center items-center p-3 h-full w-10"
			>
				<div className=" bg-white w-full h-[3px] rounded-sm"></div>
				<div className=" bg-white w-full h-[3px] rounded-sm"></div>
				<div className=" bg-white w-full h-[3px] rounded-sm"></div>
			</button>

			<div
				onClick={() => setShowLogout((prev) => !prev)}
				className=" ml-auto text-white font-bold"
			>
				<div className="inline border-2 rounded-full p-1 mr-2">
					<MdOutlinePerson className="inline-block   text-xl" />
				</div>
				<span>{user?.userName}</span>
				<div className={`absolute ${showLogout ? "block" : "hidden"}`}>
					<button
						className="text-black bg-green-400 p-1"
						onClick={handleLogout}
					>
						Logout
					</button>
				</div>
			</div>
		</div>
	);
};

export default Header;
