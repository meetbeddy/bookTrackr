import * as api from "../api/index";
import {
	ADD_NEW_USER,
	ALL_USERS,
	DELETE_USER,
	START_LOADING,
} from "./constants";

export const createuser = (user, Swal) => async (dispatch) => {
	try {
		const { data } = await api.createUser(user);

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

export const getUsers = () => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const { data } = await api.getUsers();

		dispatch({ type: ALL_USERS, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const deleteUser = (id, swal) => async (dispatch) => {
	console.log(id);
	try {
		await api.deleteUser(id);

		dispatch({ type: DELETE_USER, payload: id });
		swal.fire({
			icon: "success",
			title: "Delete Successful",
			text: "user deleted successfuly!",
		});
	} catch (error) {
		console.log(error);
	}
};
