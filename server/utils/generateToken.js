import jwt from "jsonwebtoken";
const generateToken = (res, userId) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "10d",
	});
	res.cookie("jwt", token, {
		maxAge: 10 * 24 * 60 * 60 * 1000,
		sameSite: "strict",
		httpOnly: true,
	});
};
export default generateToken;
