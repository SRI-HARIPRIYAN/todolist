import express from "express";
import passport from "passport";
import axios from "axios";
import User from "../model/userModel.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: process.env.CLIENT_URL,
		failureRedirect: `${process.env.CLIENT_URL}login/failed`,
	})
);

router.get("/google", async (req, res) => {
	try {
		const response = await axios.get(
			"https://accounts.google.com/o/oauth2/v2/auth",
			{
				params: req.query,
			}
		);
		console.log(response);
		res.send(response);
	} catch (error) {
		console.log("error in /google route ", error);
		res.status(500).json({ error: "internal server error" });
	}
});

router.get("/login/success", async (req, res) => {
	if (req.user) {
		const userExists = await User.findOne({ email: req.user._json.email });
		if (userExists) {
			generateTokenAndSetCookie(res, userExists._id);
		} else {
			const newUser = new User({
				name: req.user._json.name,
				email: req.user._json.email,
				password: Date.now(),
			});

			generateTokenAndSetCookie(res, newUser._id);
			await newUser.save();
		}
		res.status(200).json({
			user: req.user,
			message: "Successfully logged in",
			_id: userExists._id,
		});
	} else {
		res.status(403).json({ error: "Not authorized" });
	}
});

router.get("/login/failed", (req, res) => {
	res.status(401).json({ error: "Login failed" });
});

router.get("/logout", (req, res) => {
	req.logout((error) => {
		if (error) {
			console.log(error);
		}
		res.redirect("/");
	});
});
export default router;
