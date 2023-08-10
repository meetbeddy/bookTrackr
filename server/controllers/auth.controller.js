import { asyncWrapper } from "../middlewares/async.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import user from "../models/users.model.js";

/**
 * sign in user
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} res
 */

export const signin = asyncWrapper(async (req, res) => {
	try {
		const { email, password } = req.body;

		const oldUser = await user.findOne({ email });
		if (!oldUser)
			return res.status(404).json({ message: "User doesn't exist" });

		const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

		if (!isPasswordCorrect)
			return res.status(400).json({ message: "Invalid password" });

		const token = jwt.sign(
			{ email: oldUser.email, id: oldUser._id, role: oldUser.role },
			process.env.JWT_SECRET,
			{
				expiresIn: "2h",
			}
		);

		res.status(200).json({ user: oldUser, token });
	} catch (err) {
		console.log(err);
		next(err);
	}
});

/**
 * sign up
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} res
 */

export const signup = asyncWrapper(async (req, res) => {
	const { firstName, lastName, email, password, confirmPassword } = req.body;
	try {
		const oldUser = await user.findOne({ email });

		if (password !== confirmPassword) {
			return res.status(404).json({ message: "password doesn't match" });
		}
		if (oldUser)
			return res.status(400).json({ message: "User already exists" });

		const hashedPassword = await bcrypt.hash(password, 12);

		const result = await user.create({
			password: hashedPassword,
			firstName,
			lastName,
			email,
		});

		const token = jwt.sign(
			{ email: result.email, id: result._id, role: result.role },
			process.env.JWT_SECRET,
			{
				expiresIn: "2h",
			}
		);

		res.status(201).json({ user: result, token });
	} catch (err) {
		res
			.status(500)
			.json({ message: "Something went wrong", error: err.message });
	}
});
