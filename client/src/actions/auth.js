import * as api from "../api/index";
import { AUTH, CREATE_PROFILE } from "./constants";

export const signin = (formData, Swal, setLoading) => async (dispatch) => {
	try {
		//login the user
		const { data } = await api.signIn(formData);

		dispatch({ type: AUTH, data });

		Swal.fire({
			icon: "success",
			title: "Login Successful",
			text: "You have successfully logged in!",
		});
		await new Promise((resolve) => setTimeout(resolve, 0));
		// history.push('/dashboard')
		window.location.href = "/dashboard";
	} catch (error) {
		console.log(error);

		Swal.fire({
			icon: "error",
			title: "Login Failed",
			text: error?.response?.data?.message,
		});
		setLoading(false);
	}
};
