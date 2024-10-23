import React from "react";

const TaskTable = ({ selectedOption }) => {
	//get from global state
	return (
		<div>
			<table>
				<thead>
					<th>S.no</th>
					<th>Title</th>
					<th>Description</th>
					<th>Due</th>
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

export default TaskTable;
