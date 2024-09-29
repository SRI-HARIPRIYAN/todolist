import mongoose from "mongoose";
const connectToMongoDB = () => {
	mongoose
		.connect(process.env.MONGO_DB_URL)
		.then(() => {
			console.log("database connected");
		})
		.catch((error) => {
			console.log("error in db connection: " + error);
		});
};

export default connectToMongoDB;
