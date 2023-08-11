import {
	FETCH_ALL_PURCHASE,
	START_LOADING,
	END_LOADING,
} from "../actions/constants";

const purchase = (state = { isLoading: true, purchases: [] }, action) => {
	switch (action.type) {
		case START_LOADING:
			return { ...state, isLoading: true };
		case END_LOADING:
			return { ...state, isLoading: false };
		case FETCH_ALL_PURCHASE:
			return {
				...state,
				purchases: action.payload,
			};

		default:
			return state;
	}
};

export default purchase;
