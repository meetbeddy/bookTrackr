import React, { useState, useEffect } from "react";
import AddPurchaseForm from "./AddPurchaseForm";
import Receipt from "./Reciept";
import { fetchTextbooks } from "../../../api";

function AddPurchase() {
	const [receiptData, setReceiptData] = useState(null);
	const [textbooks, setTextbooks] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const textbooksData = await fetchTextbooks();

				setTextbooks(textbooksData?.data);
			} catch (error) {
				console.error("Error fetching textbooks:", error);
			}
		};

		fetchData();
	}, []);

	const setSubmitSuccess = (data) => {
		const receipt = {
			studentName: data.studentName,
			regNum: data.regNum,
			phoneNumber: data.phoneNumber,
			department: data.department,
			textbook: data.textbook,
			verificationCode: data.verificationCode,
		};
		setReceiptData(receipt);
	};

	const handleNewTransaction = () => {
		setReceiptData(null);
	};

	return (
		<div className='flex justify-center items-center min-h-screen bg-gray-100'>
			<div className='w-full max-w-md'>
				{receiptData ? (
					<Receipt data={receiptData} newTransaction={handleNewTransaction} />
				) : (
					<AddPurchaseForm
						setSubmitSuccess={setSubmitSuccess}
						textbooks={textbooks}
					/>
				)}
			</div>
		</div>
	);
}

export default AddPurchase;
