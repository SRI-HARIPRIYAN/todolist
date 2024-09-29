import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
const logoutUser = async (req, res) => {
	try {
		res.cookie("jwt", "", {
			httpOnly: true,
			expires: new Date(0),
		});
		res.status(200).json({
			message: "Logged out successfully",
		});
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: error?.message });
	}
};
const loginUser = async (req, res) => {
	const { userName, password } = req.body;
	const user = await User.findOne({ userName });
	if (user && (await user.matchPassword(password))) {
		generateToken(res, user._id);
		res.status(200).json({
			_id: user._id,
			name: user.userName,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(401).json({
			error: "Invalid username or password",
		});
	}
};
const registerUser = async (req, res) => {
	try {
		const { userName, password } = req.body;

		let user = await User.findOne({ userName });
		if (user) {
			return res.status(400).json({ error: "User already present" });
		}
		user = new User({
			userName,
			password,
		});

		await user.save();
		generateToken(res, user._id);
		res.status(201).json({
			_id: user._id,
			name: user.userName,
			isAdmin: user.isAdmin,
		});
	} catch (error) {
		res.status(500).json({ error: "server error in register controller" });
	}
};

export { logoutUser, loginUser, registerUser };
