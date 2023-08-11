import mongoose from "mongoose";

const purchaseSchema = mongoose.Schema(
	{
		verificationCode: {
			type: String,
			required: true,
			unique: true,
		},
		studentName: {
			type: String,
			required: true,
		},
		regNum: {
			type: String,
			required: true,
		},
		phoneNumber: {
			type: String,
			required: true,
		},
		department: {
			type: String,
			required: true,
		},
		textbook: {
			type: String,
			required: true,
		},
		amount: {
			type: String,
			required: true,
		},
		verified: {
			type: Boolean,
			default: false,
		},
	},

	{ timestamps: true }
);

export default mongoose.model("Purchase", purchaseSchema);
