import React, { useState } from "react";
import useCreateTaskHook from "../../hooks/task/useCreateTaskHook";
const AddNewTask = ({ setAddNewTask }) => {
	const [assignTo, setAssignTo] = useState("");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [dueDate, setDueDate] = useState("");
	const { createTask } = useCreateTaskHook();

	const handleAddTask = async (e) => {
		e.preventDefault();
		await createTask({ title, description, dueDate, assignTo });
	};
	return (
		<div className="absolute top-0 left-0 w-screen h-screen   backdrop-blur-sm z-20 grid place-content-center">
			<div className="bg-blue-300 z-30 flex flex-col gap-2 p-6 rounded-md bg-opacity-50 md:w-[350px]  relative">
				<h1 className=" text-lg font-bold ">New Task</h1>
				<form className="flex flex-col gap-3">
					<div className=" flex flex-col">
						<label htmlFor="member" className="font-semibold">
							{" "}
							Assign to
						</label>
						<input
							type="text"
							name="member"
							className=" ml-2 pl-2 h-10  rounded-md focus:outline-2 focus:outline-blue-500"
							list="members"
							value={assignTo}
							onChange={(e) => setAssignTo(e.target.value)}
							autoComplete=""
						/>
						{/* <datalist id="members">
							<option value="member1">member 1</option>
						</datalist> */}
					</div>
					<div className=" flex flex-col">
						<label htmlFor="title" className="font-semibold">
							{" "}
							Title
						</label>
						<input
							type="text"
							name="title"
							className=" ml-2 pl-2 h-10 rounded-md focus:outline-2 focus:outline-blue-500"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div className=" flex flex-col">
						<label htmlFor="description" className="font-semibold">
							{" "}
							Description
						</label>
						<input
							type="text"
							name="description"
							className=" ml-2 pl-2 h-10 rounded-md focus:outline-2 focus:outline-blue-500"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
					<div className=" flex flex-col">
						<label htmlFor="dueDate" className="font-semibold">
							{" "}
							Due
						</label>
						<input
							type="date"
							name="dueDate"
							className="ml-2 pl-2 h-10  rounded-md focus:outline-2 focus:outline-blue-500"
							value={dueDate}
							onChange={(e) => setDueDate(e.target.value)}
						/>
					</div>
					<button
						onClick={handleAddTask}
						className="bg-blue-500 border-2 border-blue-300 hover:bg-blue-600 text-white rounded-md py-1"
					>
						Add
					</button>
				</form>
				<button
					onClick={() => setAddNewTask((prev) => !prev)}
					className=" text-white border-2 border-white rounded-md p-1 absolute right-2 top-2 bg-red-500 bg-opacity-85 "
				>
					Close
				</button>
			</div>
		</div>
	);
};

export default AddNewTask;
