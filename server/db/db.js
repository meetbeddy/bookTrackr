import mongoose from "mongoose";
import user from "../models/users.model.js";
import bcrypt from "bcrypt";

const connect_db = async () => {
	try {
		mongoose
			.connect(process.env.MONGO_URI, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			.then(() => console.log("database ready to go"));
		const admin = await user.findOne({ email: "admin@admin.com" });
		if (!admin) {
			try {
				const hashedPassword = await bcrypt.hash("admin-secret", 12);
				const adm = await user.create({
					password: hashedPassword,
					firstName: "John",
					lastName: "Doe",
					phone: "07064492675",
					email: "admin@admin.com",
					role: "admin",
				});
				console.log("Admin Created Succesfully", adm);
			} catch (e) {
				console.log(e.message);
				console.log(e);
			}
		}
	} catch (e) {
		console.log("🚀 ~ file: db_connection.js ~ line 12 ~ connect ~ e", e);
	}
};

export default connect_db;
