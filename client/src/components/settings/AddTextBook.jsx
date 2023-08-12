import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
	name: yup.string().required("textbook name is required"),
	price: yup.string().required("price is required"),
});
const UserForm = ({ open, onClose, onSubmit }) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Add textbook info</DialogTitle>
			<DialogContent>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name='name'
						control={control}
						rules={{ required: "textbook name is required" }}
						render={({ field }) => (
							<TextField
								{...field}
								margin='normal'
								label='Textbook Name'
								fullWidth
								error={!!errors.name}
								helperText={errors.name?.message}
							/>
						)}
					/>
					<Controller
						name='price'
						control={control}
						rules={{ required: "price is required" }}
						render={({ field }) => (
							<TextField
								{...field}
								margin='normal'
								label='Textbook Price'
								fullWidth
								error={!!errors.price}
								helperText={errors.price?.message}
							/>
						)}
					/>
				</form>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color='primary'>
					Cancel
				</Button>
				<Button onClick={handleSubmit(onSubmit)} color='primary'>
					Create
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default UserForm;
