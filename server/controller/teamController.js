import Team from "../model/teamModel.js";
import User from "../model/userModel.js";
import Task from "../model/taskModel.js";
const createTeam = async (req, res) => {
	try {
		const { teamName } = req.body;
		const admin = req.user.id;
		const user = await User.findById(admin);
		let team = await Team.findOne({ teamName });
		if (team) {
			return res.status(400).json({ message: "Team already present" });
		}
		team = new Team({
			teamName,
			admin,
		});
		const response = await team.save();
		user.teams.push(response._id);
		await user.save();
		res.status(201).json(response);
	} catch (error) {
		console.log("Error in createTeam controller", error);
		res.status(500).json({ error: error.message });
	}
};

const addMemberToTeam = async (req, res) => {
	try {
		const { memberName } = req.body;
		console.log("memberName: ", memberName);
		const { id: teamId } = req.params;
		const team = await Team.findById(teamId);
		const user = await User.findOne({ userName: memberName }).select(
			"-password"
		);
		//dont know what this will return an array of all the objects?
		console.log("team", team);
		console.log("user", user);
		console.log(user._id);

		if (!team) {
			return res.status(404).json({ message: "Team not found!" });
		}

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		if (team.members.includes(user._id)) {
			return res.status(400).json({ error: "User already added" });
		}

		team.members.push(user._id);
		console.log("members added: ", team.members);
		user.teams.push(team._id);
		console.log("user teams: ", user.teams);
		//to ensure no duplicate id's are added
		/* users.forEach((user) => {
			if (!team.members.includes(user._id)) {
				team.members.push(user._id);
			}
		}); */

		/* const team = await Team.findByIdAndUpdate(
			teamId,
			{ $pull: { members: memberId } },  // $pull operator removes the matching memberId
			{ new: true }  // Return the updated document after modification
		  ); */

		//team.members.push(...users.map((user) => user._id)); --> this will allow duplicate id's too
		await team.save();
		await user.save();
		res.status(200).json({ message: "Added successfully" });
	} catch (error) {
		console.log("Error in addMember controller", error);
		res.status(500).json({ error: error.message });
	}
};

const removeMember = async (req, res) => {
	try {
		console.log(req.body);
		let { memberId } = req.body;
		const { id: teamId } = req.params;
		const team = await Team.findById(teamId);
		const user = await User.findById(memberId);
		const tasks = await Task.DeleteMany({
			assignedTo: memberId,
			createdBy: user._id,
		});
		if (!team) {
			return res.status(404).json({ message: "Team not found!" });
		}
		if (!user) {
			return res.status(404).json({ message: "User not found!" });
		}
		// memberId = memberId.toString();
		console.log("before removing", team.members);

		const newteamMembers = team.members.filter(
			(item) => item.toString() !== memberId.toString() // the id object cannot be compared with string object so converted both to ensure strinng comparision
		);
		team.members = newteamMembers;
		user.teams = user.teams.filter(
			(inTeam) => inTeam._id.toString() !== team._id.toString()
		);
		console.log("userteams: ", user.teams);
		console.log("after removing", team.members);

		//saving updated team
		const respose = await team.save();

		console.log("response", respose);
		res.status(200).json(team);
	} catch (error) {
		console.log("Error in removemember controller", error);
		res.status(500).json({ error: error.message });
	}
};

const getTeams = async (req, res) => {
	const { id: userId } = req.user;
	try {
		const teams = await Team.find({ admin: userId }).populate(
			"members",
			"_id userName email" //no more whitespace after the strings like"_id userName email_"
		);
		if (teams.length === 0) {
			return res.status(200).json([]);
		}
		res.status(200).json(teams);
	} catch (error) {
		console.log("Error in get team controller", error);
		res.status(500).json({ error: error.message });
	}
};

const deleteTeam = async (req, res) => {
	const { id: teamId } = req.params;
	try {
		const deletedTeam = await Team.findByIdAndDelete(teamId);
		if (!deletedTeam) {
			return res.status(404).json({ message: "Team not found" });
		}
		res.status(200).json({ message: "Team deleted" });
	} catch (error) {
		console.log("Error in delete team controller", error);
		res.status(500).json({ error: error.message });
	}
};

const getTeam = async (req, res) => {
	const { id: teamId } = req.params;
	try {
		const team = await Team.findById(teamId).populate(
			"members",
			"_id userName email" //no more whitespace after the strings like"_id userName email_"
		);
		if (!team) {
			return res.status(404).json({ error: "Team not found" });
		}
		res.status(200).json(team);
	} catch (error) {
		console.log("Error in get team controller", error);
		res.status(500).json({ error: error.message });
	}
};
export {
	createTeam,
	addMemberToTeam,
	removeMember,
	getTeams,
	deleteTeam,
	getTeam,
};
