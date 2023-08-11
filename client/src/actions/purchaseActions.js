import * as api from "../api/index";
import {
	ADD_NEW_USER,
	ALL_USERS,
	DELETE_USER,
	START_LOADING,
} from "./constants";

export const createPuchase = (purchase, Swal) => async (dispatch) => {
	try {
		const { data } = await api.createPurchase(purchase);

		dispatch({ type: ADD_NEW_USER, payload: data });

		Swal.fire({
			icon: "success",
			title: "User Account Created",
			text: "You have successfully created new user!",
		});
	} catch (error) {
		console.log(error);

		Swal.fire({
			icon: "error",
			title: "Create user failed",
			text: error?.response?.data?.message,
		});
	}
};
