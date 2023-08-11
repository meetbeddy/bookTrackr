import {
	ALL_USERS,
	ADD_NEW_USER,
	DELETE_USER,
	START_LOADING,
	END_LOADING,
} from "../actions/constants";

const admin = (state = { isLoading: true, users: [] }, action) => {
	switch (action.type) {
		case START_LOADING:
			return { ...state, isLoading: true };
		case END_LOADING:
			return { ...state, isLoading: false };

		case ALL_USERS:
			return {
				...state,
				users: action.payload,
			};
		case ADD_NEW_USER:
			return { ...state, users: [...state.users, action.payload.newUser] };

		case DELETE_USER:
			return {
				...state,
				users: state.users.filter((user) => user._id !== action.payload),
			};
		default:
			return state;
	}
};

export default admin;
