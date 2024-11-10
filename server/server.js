import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectToDb } from "./utils/db.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import protect from "./middleware/authMiddleware/protect.js";
import passport from "./utils/passport.js";
import authRoutes from "./routes/authRoutes.js";
dotenv.config();

const app = express();

connectToDb();

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
	next();
});
app.use(
	cors({
		origin: "http://localhost:3000",
		methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
		credentials: true,
	})
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

passport(app);
app.use("/api/auth", userRoutes);
app.use("/tasks", taskRoutes);
app.use("/teams", teamRoutes);
app.use("/auth", authRoutes);

app.use(protect);

app.listen(process.env.PORT || 5000, () => {
	console.log("server running");
});
