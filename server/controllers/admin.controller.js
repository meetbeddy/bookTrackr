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
	const {
		firstName,
		lastName,
		email,
		phone,
		password,
		role: userRole,
	} = req.body;

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

		const newUser = await user.create({
			password: hashedPassword,
			firstName,
			lastName,
			phone,
			email,
			role: userRole,
		});

		res.status(201).json({ message: "user created", newUser });
	} catch (err) {
		res
			.status(500)
			.json({ message: "Something went wrong", error: err.message });
	}
});

export const fetchusers = asyncWrapper(async (req, res) => {
	const { role } = req;

	try {
		if (role !== "admin")
			return res
				.status(404)
				.json({ message: "unauthorized to perform this operation" });
		const users = await user
			.find({ role: { $ne: "admin" } })
			.select("-password");

		res.status(201).json(users);
	} catch (err) {
		res
			.status(500)
			.json({ message: "Something went wrong", error: err.message });
	}
});
