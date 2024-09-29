import express from "express";
import {
	logoutUser,
	loginUser,
	registerUser,
} from "../controllers/userController.js";
import validateUserDetails from "../middleware/validateUserDetails.js";

const router = express.Router();
router.route("/signup").post(validateUserDetails, registerUser);
router.route("/login").post(validateUserDetails, loginUser);
router.route("/logout").post(logoutUser);

export default router;
