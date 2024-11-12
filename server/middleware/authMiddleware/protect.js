import jwt from "jsonwebtoken";
import User from "../../model/userModel.js";
const protect = async (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.user = await User.findById(decoded.userId).select("-password");
			next();
		} catch (error) {
			console.log("Error in protect middleware: ", error);
			res.status(500).json({
				error: "Its not your fault.. we work to get rid of this",
			});
		}
	} else {
		return res.status(401).json({ error: "Token not found please login" });
	}
};

export default protect;
