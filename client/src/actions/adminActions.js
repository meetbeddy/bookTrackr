import * as api from "../api/index";
import { ADD_NEW_USER, ALL_USERS, START_LOADING } from "./constants";

export const createuser = (user) => async (dispatch) => {
	try {
		const { data } = await api.createUser(user);

		dispatch({ type: ADD_NEW_USER, payload: data });
	} catch (error) {
		console.log(error);
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
