import { yupResolver } from "@hookform/resolvers/yup";
import { Controller } from "react-hook-form";
import { Container, Paper, TextField, styled } from "@mui/material";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { signin } from "../../actions/auth";
import { useDispatch } from "react-redux";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	email: yup
		.string()
		.email("You must enter a valid email")
		.required("You must enter an email"),
	password: yup
		.string()
		.required("Please enter your password.")
		.min(6, "Password is too short - must be at least 6 chars."),
});

const defaultValues = {
	email: "",
	password: "",
};
function Login() {
	const LoginPaper = styled(Paper)(({ theme }) => ({
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: theme.spacing(0),
	}));

	const LoginAvatar = styled(Avatar)(({ theme }) => ({
		margin: theme.spacing(1),
		backgroundColor: "#1976d2",
	}));

	const LoginForm = styled("form")(({ theme }) => ({
		width: "100%",
		marginTop: theme.spacing(3),
	}));

	const [loading, setLoading] = useState(false);

	const { control, formState, handleSubmit, setValue, setError } = useForm({
		mode: "onChange",
		defaultValues,
		resolver: yupResolver(schema),
	});

	const { isValid, dirtyFields, errors } = formState;

	const dispatch = useDispatch();

	function onSubmit({ email, password }) {
		dispatch(signin({ email, password }, Swal, setLoading));
	}
	return (
		<Container component='main' maxWidth='xs'>
			<LoginPaper elevation={2}>
				<LoginAvatar>
					<LockOutlinedIcon />
				</LoginAvatar>
				<Typography component='h1' variant='h5'>
					Sign In
				</Typography>
				<LoginForm
					name='instituteRegForm'
					noValidate
					className='flex flex-col justify-center w-full mt-32'
					onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name='email'
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								className='mb-24 bg-[#D8D8D8]'
								label='Email'
								autoFocus
								type='text'
								error={!!errors.email}
								helperText={errors?.email?.message}
								variant='outlined'
								required
								fullWidth
							/>
						)}
					/>
					<br />
					<Controller
						name='password'
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								className='mb-24 bg-[#D8D8D8]'
								label='Password'
								autoFocus
								type='password'
								error={!!errors.password}
								helperText={errors?.password?.message}
								variant='outlined'
								required
								fullWidth
							/>
						)}
					/>
					<br />
					<div className='flex justify-between'>
						<Button
							variant='contained'
							size='large'
							className='w-1/2 rounded-lg'
							color='primary'
							aria-label='Sign in'
							disabled={!isValid}
							type='submit'>
							Sign in
						</Button>

						<FormControlLabel
							control={<Checkbox />}
							label='Stay Signed in'
							sx={{
								"& .MuiSvgIcon-root": {
									fontSize: 20,
									textTransform: "initial",
								},
							}}
						/>
					</div>
				</LoginForm>
			</LoginPaper>
		</Container>
	);
}

export default Login;
