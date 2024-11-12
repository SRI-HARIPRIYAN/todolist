import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (res, userId) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});
	console.log("cookie called");
	res.cookie("jwt", token, {
		httpOnly: true,
		sameSite: "lax",
		secure: process.env.NODE_ENV !== "development",
		maxAge: 15 * 24 * 60 * 60 * 1000,
	});
	console.log("cookie executed");
};
export default generateTokenAndSetCookie;
