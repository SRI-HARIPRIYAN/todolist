import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectToDb } from "./utils/db.js";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import protect from "./middleware/authMiddleware/protect.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/auth", userRoutes);
app.use("/tasks", taskRoutes);
app.use("/teams", teamRoutes);

app.use(protect);
connectToDb();

app.listen(process.env.PORT || 5000, () => {
	console.log("server running");
});
