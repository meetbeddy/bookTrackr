import { asyncWrapper } from "../middlewares/async.js";
import bcrypt from "bcrypt";
import user from "../models/users.model.js";
import Textbook from "../models/textbook.model.js";
import textbookModel from "../models/textbook.model.js";

/**
 * create new user
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

export const deleteuser = asyncWrapper(async (req, res) => {
	const { role } = req;

	const id = req.params.id;

	try {
		if (role !== "admin")
			return res
				.status(404)
				.json({ message: "unauthorized to perform this operation" });
		const deletedUser = await user.findByIdAndDelete(id);

		if (!deletedUser) {
			return res.status(404).json({ message: "User not found" });
		}

		return res.status(200).json(deletedUser);
	} catch (err) {
		res
			.status(500)
			.json({ message: "Something went wrong", error: err.message });
	}
});

export const createtextbook = asyncWrapper(async (req, res) => {
	const { name, price } = req.body;

	const { role } = req;

	try {
		if (role !== "admin")
			return res
				.status(404)
				.json({ message: "unauthorized to perform this operation" });

		const textbook = await Textbook.create({
			name,
			price,
		});

		res.status(201).json({ textbook });
	} catch (err) {
		res
			.status(500)
			.json({ message: "Something went wrong", error: err.message });
	}
});

export const fetchTextbooks = asyncWrapper(async (req, res) => {
	try {
		const textbooks = await Textbook.find();

		res.status(201).json(textbooks);
	} catch (err) {
		res
			.status(500)
			.json({ message: "Something went wrong", error: err.message });
	}
});

export const deletetextbook = asyncWrapper(async (req, res) => {
	const { role } = req;

	const id = req.params.id;

	try {
		if (role !== "admin")
			return res
				.status(404)
				.json({ message: "unauthorized to perform this operation" });
		const deletedtextbook = await Textbook.findByIdAndDelete(id);

		if (!deletedtextbook) {
			return res.status(404).json({ message: "textbook not found" });
		}

		return res.status(200).json(deletedtextbook);
	} catch (err) {
		res
			.status(500)
			.json({ message: "Something went wrong", error: err.message });
	}
});
