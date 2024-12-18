import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useCreateTaskHook from "../../hooks/task/useCreateTaskHook";
import Spinner from "../Spinner";
import { useUserContext } from "../../context";
const NewTask = ({ setOpenTask }) => {
	const { createTask, loading } = useCreateTaskHook();
	const { user } = useUserContext();
	const [taskData, setTaskData] = useState({
		title: "",
		description: "",
		dueDate: new Date(),
		status: "pending",
		assignTo: user.userName,
	});

	const handleCreateTask = async (e) => {
		e.preventDefault();
		await createTask(taskData);
		setOpenTask(false);
	};

	return (
		<div className="w-full h-full overflow-hidden absolute  top-0 left-0 flex flex-col items-center justify-center  bg-opacity-50  backdrop-blur-sm z-60">
			<div className="relative text-black w-[300px] sm:w-[400px] rounded-md  p-4 sm:mt-32 bg-blue-300 bg-opacity-60">
				<h2 className="font-bold text-black text-center">New Task</h2>
				<button
					onClick={() => setOpenTask((prev) => !prev)}
					className="text-white bg-red-500 px-1 rounded-md right-1 top-1 font-bold absolute"
				>
					close
				</button>
				<form className="  flex flex-col gap-4 p-4 ">
					<div className="flex items-center">
						<label htmlFor="title" className=" w-1/2">
							Title
						</label>
						<input
							type="text"
							className=" pl-1 py-2 text-black text-sm sm:text-md rounded-sm"
							name="title"
							id="title"
							placeholder="Code 2  problems"
							onChange={(e) =>
								setTaskData((prev) => ({
									...prev,
									title: e.target.value,
								}))
							}
							value={taskData.title}
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="description" className=" w-1/2">
							Description
						</label>
						<textarea
							type="text"
							className="pl-1 py-2 text-black text-sm sm:text-md rounded-md"
							name="description"
							id="description"
							placeholder="Take on the challenge"
							onChange={(e) =>
								setTaskData((prev) => ({
									...prev,
									description: e.target.value,
								}))
							}
							value={taskData.description}
						></textarea>
					</div>
					<div className="flex items-center">
						<label htmlFor="dueDate" className=" w-1/2">
							Due Date
						</label>
						{/* <input
						type="text"
						className="pl-1 py-2 text-black text-sm sm:text-md rounded-sm"
						name="dueDate"
						id="dueDate"
						onChange={handleChange(e)}
						value={taskData.dueDate}
					/> */}
						<DatePicker
							selected={taskData.dueDate}
							onChange={(date) =>
								setTaskData((prevData) => ({
									...prevData,
									dueDate: date,
								}))
							}
							className="pl-1 py-2 text-black text-sm sm:text-md rounded-sm"
							name="dueDate"
							id="dueDate"
							value={taskData.dueDate}
							dateFormat="dd-MM-yyyy"
							showYearDropdown
							scrollableYearDropdown
						/>
					</div>
					<div className="flex items-center">
						<p className=" w-1/2">Status</p>

						<p className="text-red-600 font-semibold">
							{taskData.status}
						</p>
					</div>
					<button
						onClick={handleCreateTask}
						type="submit"
						className="w-fit bg-green-400 mx-auto rounded-md px-2 py-1"
					>
						Done
					</button>
				</form>
			</div>
			{loading && <Spinner />}
		</div>
	);
};

export default NewTask;
