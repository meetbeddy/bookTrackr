import * as api from "../api/index";
import { FETCH_ALL_PURCHASE } from "./constants";

export const fetchAllPurchases = (query) => async (dispatch) => {
	try {
		const { data } = await api.fetchAllPurchases(query);

		dispatch({ type: FETCH_ALL_PURCHASE, payload: data });
	} catch (error) {
		console.log(error);
	}
};
