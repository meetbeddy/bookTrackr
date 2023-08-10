import mongoose from "mongoose";

const userSchema = mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		phone: { type: String },
		password: { type: String, required: true },
		role: {
			type: String,
			required: true,
			enum: ["department staff", "bookstore staff", "admin"],
			default: "admin",
		},
	},

	{ timestamps: true }
);

export default mongoose.model("User", userSchema);
