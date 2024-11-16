import React, { useState } from "react";
import { TiTick } from "react-icons/ti";

const TeamTaskTable = ({ selectedOption }) => {
	return (
		<div className="bg-white pt-6 md:w-2/3 overflow-x-scroll">
			<table className=" w-full text-sm  bg-white text-center">
				<thead className="font-normal text-sm py-2 border-collapse">
					<tr>
						<th className=" border-2 ">
							<TiTick className="inline text-lg" />
						</th>
						<th className=" border-2">Title</th>
						<th className=" border-2">Description</th>
						<th className=" border-2">Assigned To</th>
						{selectedOption === "allTasks" ? (
							<th className="border-2">Status</th>
						) : (
							<th className="border-2">Due</th>
						)}
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1</td>
						<td>Dsa</td>
						<td>For better future</td>
						<td>today</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default TeamTaskTable;
