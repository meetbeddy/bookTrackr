import { asyncWrapper } from "../middlewares/async.js";
import Purchase from "../models/purchase.model.js";
import Textbook from "../models/textbook.model.js";
import uniqid from "uniqid";

export const createPurchase = asyncWrapper(async (req, res) => {
	const { studentName, regNum, phoneNumber, department, textbook } = req.body;

	try {
		const foundBook = await Textbook.findOne({ _id: textbook });

		console.log(foundBook);
		if (!foundBook) {
			return res.status(400).json({ message: "Textbook not found" });
		}

		// Generate a verification code based on the textbook name and unique id
		const verificationCode = `${foundBook.name.replace(
			/\s+/g,
			""
		)}-${uniqid.time()}`.toUpperCase();

		console.log(verificationCode);

		// Create a new purchase
		const newPurchase = new Purchase({
			verificationCode,
			studentName,
			regNum,
			phoneNumber,
			department,
			textbook: foundBook.name,
			amount: foundBook.price,
		});

		await newPurchase.save();

		res.status(201).json({ message: "Purchase created", newPurchase });
	} catch (err) {
		res
			.status(500)
			.json({ message: "Something went wrong", error: err.message });
	}
});

export const verifyPurchase = asyncWrapper(async (req, res) => {
	const verificationCode = req.params.id;

	try {
		const foundPurchase = await Purchase.findOne({
			verificationCode: verificationCode,
		});

		if (!foundPurchase) {
			return res.status(400).json({ message: "Verification code not found" });
		}

		foundPurchase.verified = true;
		await foundPurchase.save();

		res.status(200).json({ message: "Purchase verified", foundPurchase });
	} catch (err) {
		res
			.status(500)
			.json({ message: "Something went wrong", error: err.message });
	}
});

export const fetchPurchase = asyncWrapper(async (req, res) => {
	try {
		const purchases = await Purchase.find();

		res.status(200).json(purchases);
	} catch (err) {
		res
			.status(500)
			.json({ message: "Something went wrong", error: err.message });
	}
});

export const generateSalesReport = async (req, res) => {
	try {
		const { fromDate, toDate, textbook, verifyStatus } = req.query;

		const matchConditions = {
			verified: true,
		};
		if (verifyStatus) {
			matchConditions.verified = verifyStatus;
		}

		if (fromDate && toDate) {
			matchConditions.createdAt = {
				$gte: new Date(fromDate),
				$lte: new Date(toDate),
			};
		}

		if (textbook) {
			matchConditions.textbook = textbook;
		}

		const salesReport = await Purchase.aggregate([
			{
				$match: matchConditions,
			},
			{
				$group: {
					_id: {
						date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
						textbook: "$textbook",
					},
					totalQuantitySold: { $sum: 1 },
					totalRevenue: { $sum: { $toDouble: "$amount" } },
				},
			},
			{
				$sort: { "_id.date": 1, "_id.textbook": 1 },
			},
		]);

		res.status(200).json(salesReport);
	} catch (error) {
		console.error("Error generating sales report:", error);
		res.status(500).json({ message: "Something went wrong" });
	}
};
