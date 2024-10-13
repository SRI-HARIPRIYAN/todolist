import User from "../model/userModel.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

const signup = async (req, res) => {
	try {
		const { userName, email, password } = req.body;
		let user = await User.findOne({ $or: [{ userName }, { email }] });
		if (user) {
			return res.status(400).json({ message: "User already exist" });
		}
		user = new User({
			userName,
			email,
			password,
		});
		const response = await user.save();
		generateTokenAndSetCookie(res, user._id);
		res.status(201).json(response);
	} catch (error) {
		console.log("error in signup controller");
		res.status(500).json({ error: error.message });
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		let user = await User.findOne({ email });

		if (user && (await user.comparePassword(password))) {
			generateTokenAndSetCookie(res, user._id);
			res.status(200).json({
				_id: user._id,
				userName: user.userName,
				email: user.email,
				teams: user.teams,
			});
		} else {
			res.status(401).json({ error: "invalid credentials" });
		}
	} catch (error) {
		console.log("error in login controller");
		res.status(500).json({ error: error?.message });
	}
};

const logout = async (req, res) => {
	try {
		res.cookie("jwt", "", {
			httpOnly: true,
			expires: new Date(0),
		});
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error);
		res.status(500).json({ error: error?.message });
	}
};

export { signup, login, logout };
