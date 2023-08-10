import React, { useState } from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	InputAdornment,
	TextField,
	Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import Receipt from "../../store-keeper/purchase/Reciept";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import "./verify.css";

const VerifyPurchase = () => {
	const [isModalOpen, setModalOpen] = useState(false);

	const [purchaseData, setPurchaseData] = useState(null);

	const schema = yup.object().shape({
		verificationCode: yup.string().required("Verification code is required"),
	});

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({ resolver: yupResolver(schema) });

	const onSubmit = async (data) => {
		try {
			// const response = await axios.post("YOUR_BACKEND_ENDPOINT", {
			// 	verificationCode: data.verificationCode,
			// });

			const response = {
				data: {
					success: true,
					message: "Verification successful",
					data: {
						verificationCode: "ABC123",
						studentName: "John Doe",
						regNum: "2023001",
						phoneNumber: "123-456-7890",
						department: "Computer Science",
						textbook: "COS 101",
						amount: "30.00",
						date: "2023-08-15",
					},
				},
			};

			const result = response.data;

			if (result.success) {
				Swal.fire({
					icon: "success",
					title: "Verification Successful!",
					text: "Purchase has been successfully verified.",
				}).then(() => {
					setPurchaseData(result.data);
					setModalOpen(true);
				});
			} else {
				Swal.fire({
					icon: "error",
					title: "Verification Failed",
					text: "The provided verification code is incorrect.",
				});
			}
		} catch (error) {
			console.error("Error verifying purchase:", error);
		}
	};

	const handleCloseModal = () => {
		setModalOpen(false);
		reset();
	};

	return (
		<div className='search-container'>
			<Typography variant='h6' gutterBottom>
				Verify Purchase
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)} className='search-form'>
				<Controller
					name='verificationCode'
					control={control}
					defaultValue=''
					render={({ field }) => (
						<TextField
							label='Enter Verification Code'
							variant='outlined'
							fullWidth
							{...field}
							error={!!errors.verificationCode}
							helperText={errors.verificationCode?.message}
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<SearchIcon />
									</InputAdornment>
								),
							}}
						/>
					)}
				/>
				<Button type='submit' variant='contained' color='primary'>
					Verify
				</Button>
			</form>

			<Dialog
				open={isModalOpen}
				onClose={handleCloseModal}
				maxWidth='md'
				fullWidth>
				<DialogTitle onClose={handleCloseModal}>
					Verified Purchase Receipt
				</DialogTitle>

				<DialogContent dividers>
					<Receipt data={purchaseData} />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseModal} color='primary'>
						Verify Another Receipt
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default VerifyPurchase;
