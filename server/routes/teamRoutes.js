import express from "express";
import protect from "../middleware/authMiddleware/protect.js";
import {
	getTeams,
	addMemberToTeam,
	removeMember,
	createTeam,
	deleteTeam,
} from "../controller/teamController.js";

const router = express.Router();

router.route("/").get(protect, getTeams);
router.route("/:id").delete(protect, deleteTeam);
router.route("/new").post(protect, createTeam);
router
	.route("/:id/members")
	.post(protect, addMemberToTeam)
	.delete(protect, removeMember);

export default router;
