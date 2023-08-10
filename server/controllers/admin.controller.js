import { asyncWrapper } from "../middlewares/async.js";
import bcrypt from "bcrypt";
import user from "../models/users.model.js";

/**
 * create new processor
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} res
 */

export const createuser = asyncWrapper(async (req, res) => {
	const { firstName, lastName, email, phone, password } = req.body;

	const { role } = req;

	try {
		if (role !== "admin")
			return res
				.status(404)
				.json({ message: "unauthorized to perform this operation" });
		const oldUser = await user.findOne({ email });

		if (oldUser)
			return res.status(400).json({ message: "User already exists" });

		const hashedPassword = await bcrypt.hash(password, 12);

		await user.create({
			password: hashedPassword,
			firstName,
			lastName,
			phone,
			email,
		});

		res.status(201).json({ message: "user created" });
	} catch (err) {
		res
			.status(500)
			.json({ message: "Something went wrong", error: err.message });
	}
});
