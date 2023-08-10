import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import errorHandler from "./middlewares/error-handler.js";
import auth from "./routes/auth.routes.js";
import admin from "./routes/admin.routes.js";

import connect_db from "./db/db.js";

const app = express();
dotenv.config();

//middlewares
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));

//routes
app.get("/", (req, res) => {
	res.send("Hello World");
});

app.use("/api/v1/auth", auth);
app.use("/api/v1/admin", admin);
app.use("/api/v1/store", bookstore);

app.use(errorHandler);

const port = process.env.PORT || 5000;

const start = () => {
	try {
		connect_db();
		app.listen(port, () => {
			console.log(`Everything soft on port ${port}`);
		});
	} catch (err) {
		console.log(err);
	}
};

start();
