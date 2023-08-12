import {
	ALL_USERS,
	ADD_NEW_USER,
	DELETE_USER,
	START_LOADING,
	END_LOADING,
	ALL_TEXTBOOK,
	ADD_NEW_TEXTBOOK,
} from "../actions/constants";

const admin = (
	state = { isLoading: true, users: [], textbooks: [] },
	action
) => {
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
		case ALL_TEXTBOOK:
			return {
				...state,
				textbooks: action.payload,
			};
		case ADD_NEW_TEXTBOOK:
			return { ...state, textbooks: [...state.users, action.payload.textbook] };

		case DELETE_USER:
			return {
				...state,
				textbooks: state.textbooks.filter(
					(textbook) => textbook._id !== action.payload
				),
			};
		default:
			return state;
	}
};

export default admin;
