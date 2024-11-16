import React, { useState } from "react";
import useCreateTeamHook from "../../hooks/team/useCreateTeamHook";
import Spinner from "../../components/Spinner.jsx";
const CreateTeam = ({ setCreateTeam }) => {
	const [title, setTitle] = useState("");
	const { createTeam, loading } = useCreateTeamHook();
	const handleCreateTeam = async () => {
		await createTeam(title);
	};
	if (loading) {
		return <Spinner />;
	}
	return (
		<div className="absolute top-0 left-0 w-screen h-screen   backdrop-blur-sm z-20 grid place-content-center">
			<div className="bg-blue-300 z-30 flex flex-col gap-2 p-6 rounded-md bg-opacity-50 font-bold relative">
				<h1 className=" text-lg">Create team</h1>
				<div className=" flex ">
					<input
						type="text"
						placeholder="title"
						className="pl-2 rounded-md h-10 font-normal border-none focus:outline-blue-300 focus:outline-4"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<button
					onClick={handleCreateTeam}
					className=" py-1 border-green-500  border-2 rounded-md text-green-700 "
				>
					Create
				</button>
				<button
					onClick={() => setCreateTeam((prev) => !prev)}
					className=" text-white rounded-md p-1 absolute right-2 top-2 bg-red-500 bg-opacity-85 "
				>
					Close
				</button>
			</div>
		</div>
	);
};

export default CreateTeam;
