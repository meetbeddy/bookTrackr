import mongoose from "mongoose";

const textbookSchema = mongoose.Schema(
	{
		name: { type: String, required: true, unique: true },
		price: { type: String, required: true },
	},

	{ timestamps: true }
);

export default mongoose.model("Purchase", textbookSchema);
