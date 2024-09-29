const validateUserDetails = (req, res, next) => {
	const { userName, password, confirmPassword } = req.body;
	if (userName.length < 6) {
		return res
			.status(400)
			.json({ error: "Username must be atleast 6 characters" });
	}
	if (password.length < 6) {
		return res
			.status(400)
			.json({ error: "Password must be atleast 6 characters" });
	}
	if (confirmPassword) {
		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords do not match" });
		}
	}

	next();
};
export default validateUserDetails;
