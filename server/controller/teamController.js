import Team from "../model/teamModel.js";
import User from "../model/userModel.js";
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
		const { newMembers } = req.body;
		console.log("newMembers", newMembers);
		const { id: teamId } = req.params;
		const team = await Team.findById(teamId);
		const users = await User.find({ userName: { $in: newMembers } });
		//dont know what this will return an array of all the objects?
		console.log("users", users);

		if (!team) {
			return res.status(404).json({ message: "Team not found!" });
		}

		//if there is no users with the given newMember userName
		if (users.length === 0) {
			return res.status(404).json({ message: "No user found" });
		}

		//to ensure no duplicate id's are added
		users.forEach((user) => {
			if (!team.members.includes(user._id)) {
				team.members.push(user._id);
			}
		});

		/* const team = await Team.findByIdAndUpdate(
			teamId,
			{ $pull: { members: memberId } },  // $pull operator removes the matching memberId
			{ new: true }  // Return the updated document after modification
		  ); */

		//team.members.push(...users.map((user) => user._id)); --> this will allow duplicate id's too
		const response = await team.save();
		console.log(users);
		console.log("response", response);
		res.status(200).json({ message: "Added successfully" });
	} catch (error) {
		console.log("Error in addMember controller", error);
		res.status(500).json({ error: error.message });
	}
};

const removeMember = async (req, res) => {
	try {
		let { memberId } = req.body;
		const { id: teamId } = req.params;
		const team = await Team.findById(teamId);

		if (!team) {
			return res.status(404).json({ message: "Team not found!" });
		}
		// memberId = memberId.toString();
		console.log("before removing", team.members);

		const newteamMembers = team.members.filter(
			(item) => item.toString() !== memberId.toString() // the id object cannot be compared with string object so converted both to ensure strinng comparision
		);

		team.members = newteamMembers;

		console.log("after removing", team.members);

		//saving updated team
		const respose = await team.save();

		console.log("response", respose);
		res.status(200).json({ message: "removed successfully" });
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
