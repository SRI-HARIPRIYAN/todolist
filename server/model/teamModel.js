import mongoose from "mongoose";

const teamSchema = mongoose.Schema(
	{
		teamName: {
			type: String,
			required: true,
		},
		admin: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		members: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{
		timestamps: true,
	}
);

const Team = mongoose.model("Team", teamSchema);

export default Team;
