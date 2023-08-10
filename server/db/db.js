import mongoose from "mongoose";

const connect_db = () => {
	try {
		mongoose
			.connect(process.env.MONGO_URI, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			.then(() => console.log("database ready to go"));
	} catch (e) {
		console.log("🚀 ~ file: db_connection.js ~ line 12 ~ connect ~ e", e);
	}
};

export default connect_db;
