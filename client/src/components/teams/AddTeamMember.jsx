import React from "react";
const AddTeamMember = ({ setAddNewMember }) => {
	console.log("new member added");
	return (
		<div className="absolute top-0 left-0 w-screen h-screen   backdrop-blur-sm z-20 grid place-content-center">
			<div className="bg-blue-300 z-30 flex flex-col gap-2 p-6 rounded-md bg-opacity-50 font-bold relative">
				<h1 className=" text-lg">New Member</h1>
				<div className=" flex ">
					<input
						type="text"
						placeholder="search"
						className="pl-2 rounded-md h-10 font-normal border-none focus:outline-blue-300 focus:outline-4"
						list="members"
					/>
					<datalist id="members">
						{/* <option value="member 1"></option>
						<option value="member 2"></option> */}
					</datalist>
					<button className=" p-2 text-green-700 ">Add</button>
				</div>
				<button
					onClick={() => setAddNewMember((prev) => !prev)}
					className=" text-white rounded-md p-1 absolute right-2 top-2 bg-red-500 bg-opacity-85 "
				>
					Close
				</button>
			</div>
		</div>
	);
};

export default AddTeamMember;
