import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
	Button,
	Container,
	TextField,
	Typography,
	MenuItem,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Spinner from "../../Spinner/Spinner";
import { createPurchase } from "../../../api";
import Swal from "sweetalert2";

const schema = yup.object().shape({
	studentName: yup.string().required("Student Name is required"),
	regNum: yup.string().required("Registration Number is required"),
	phoneNumber: yup.string().required("Phone Number is required"),
	department: yup.string().required("Department is required"),
	textbook: yup.string().required("Textbook is required"),
});

const PurchaseForm = ({ setSubmitSuccess, textbooks }) => {
	const [isLoading, setIsloading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (formdata) => {
		setIsloading(true);
		let receipt;

		try {
			const { data } = await createPurchase(formdata);

			receipt = data.newPurchase;

			Swal.fire({
				icon: "success",
				title: "Purchase Created",
				text: "Your purchase has been successfully created.",
			});
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: "Error",
				text: "An error occurred while creating the purchase.",
			});
		}
		setIsloading(false);
		setSubmitSuccess(receipt);
	};

	if (isLoading) {
		return (
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
					paddingTop: "20px",
				}}>
				<Spinner />
			</div>
		);
	}

	return (
		<Container maxWidth='sm'>
			<Typography variant='h4' align='center' mt={4} mb={2}>
				Capture Textbook Sales
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextField
					label='Student Name'
					fullWidth
					margin='normal'
					{...register("studentName")}
					error={!!errors.studentName}
					helperText={errors.studentName?.message}
				/>
				<TextField
					label='Registration Number'
					fullWidth
					margin='normal'
					{...register("regNum")}
					error={!!errors.regNum}
					helperText={errors.regNum?.message}
				/>
				<TextField
					label='Phone Number'
					fullWidth
					margin='normal'
					{...register("phoneNumber")}
					error={!!errors.phoneNumber}
					helperText={errors.phoneNumber?.message}
				/>
				<TextField
					label='Department'
					fullWidth
					margin='normal'
					{...register("department")}
					error={!!errors.department}
					helperText={errors.department?.message}
				/>
				<TextField
					select
					label='Textbook'
					fullWidth
					margin='normal'
					{...register("textbook")}
					error={!!errors.textbook}
					helperText={errors.textbook?.message}
					defaultValue=''>
					<MenuItem disabled value=''>
						<em>Select a textbook</em>
					</MenuItem>
					{textbooks.map((textbook) => (
						<MenuItem key={textbook._id} value={textbook._id}>
							{textbook.name}
						</MenuItem>
					))}
				</TextField>
				<Button
					type='submit'
					variant='contained'
					color='primary'
					startIcon={<AddCircleIcon />}>
					Generate Receipt
				</Button>
			</form>
		</Container>
	);
};

export default PurchaseForm;
