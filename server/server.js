import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import connectToMongoDB from "./utils/mongoBDconnect.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRoutes);
app.use("/task", taskRoutes);

app.listen(process.env.PORT, () => {
	connectToMongoDB();
	console.log("server running");
});
