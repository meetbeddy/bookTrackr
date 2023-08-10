import React, { useState } from "react";
import AddPurchaseForm from "./AddPurchaseForm";
import Receipt from "./Reciept";

function AddPurchase() {
	const [receiptData, setReceiptData] = useState(null);

	const setSubmitSuccess = (data) => {
		// Assuming you generate receipt data on form submit
		// Replace this with actual receipt data generation
		const receipt = {
			studentName: data.studentName,
			regNum: data.regNum,
			phoneNumber: data.phoneNumber,
			department: data.department,
			textbook: data.textbook,
			verificationCode: "ABCD1234", // Replace with actual verification code
		};
		setReceiptData(receipt);
	};
	return (
		<div className='flex justify-center items-center min-h-screen bg-gray-100'>
			<div className='w-full max-w-md'>
				{receiptData ? (
					<Receipt data={receiptData} />
				) : (
					<AddPurchaseForm setSubmitSuccess={setSubmitSuccess} />
				)}
			</div>
		</div>
	);
}

export default AddPurchase;
