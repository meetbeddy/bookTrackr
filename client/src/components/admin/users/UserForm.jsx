import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	MenuItem,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
	firstName: yup.string().required("First name is required"),
	lastName: yup.string().required("Last name is required"),
	email: yup.string().email("Invalid email").required("Email is required"),
	phoneNumber: yup.string().required("Phone number is required"),
	password: yup.string().required("Password is required"),
	role: yup.string().required("Role is required"),
});
const UserForm = ({ open, onClose, onSubmit }) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const roles = ["bookstore staff", "department staff"]; // List of available roles

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Create User Account</DialogTitle>
			<DialogContent>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name='firstName'
						control={control}
						rules={{ required: "First name is required" }}
						render={({ field }) => (
							<TextField
								{...field}
								margin='normal'
								label='First Name'
								fullWidth
								error={!!errors.firstName}
								helperText={errors.firstName?.message}
							/>
						)}
					/>
					<Controller
						name='lastName'
						control={control}
						rules={{ required: "Last name is required" }}
						render={({ field }) => (
							<TextField
								{...field}
								margin='normal'
								label='Last Name'
								fullWidth
								error={!!errors.lastName}
								helperText={errors.lastName?.message}
							/>
						)}
					/>
					<Controller
						name='email'
						control={control}
						rules={{ required: "Email is required" }}
						render={({ field }) => (
							<TextField
								{...field}
								margin='normal'
								type='email'
								label='Email'
								fullWidth
								error={!!errors.email}
								helperText={errors.email?.message}
							/>
						)}
					/>
					<Controller
						name='phoneNumber'
						control={control}
						rules={{ required: "Phone number is required" }}
						render={({ field }) => (
							<TextField
								{...field}
								margin='normal'
								label='Phone Number'
								fullWidth
								error={!!errors.phoneNumber}
								helperText={errors.phoneNumber?.message}
							/>
						)}
					/>
					<Controller
						name='password'
						control={control}
						rules={{ required: "Password is required" }}
						render={({ field }) => (
							<TextField
								{...field}
								margin='normal'
								type='password'
								label='Password'
								fullWidth
								error={!!errors.password}
								helperText={errors.password?.message}
							/>
						)}
					/>
					<Controller
						name='role'
						control={control}
						rules={{ required: "Role is required" }}
						render={({ field }) => (
							<TextField
								{...field}
								margin='normal'
								select
								label='Role'
								fullWidth
								error={!!errors.role}
								helperText={errors.role?.message}>
								{roles.map((role) => (
									<MenuItem key={role} value={role}>
										{role}
									</MenuItem>
								))}
							</TextField>
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
