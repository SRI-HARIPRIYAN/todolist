import express from "express";
import dotenv from "dotenv";
import { connectToDb } from "./utils/db.js";
dotenv.config();
const app = express();

connectToDb();
app.listen(process.env.PORT, () => {
	console.log("server running");
});
