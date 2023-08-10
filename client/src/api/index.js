import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });
// const API = axios.create({ baseURL: process.env.REACT_APP_API})

API.interceptors.request.use((req) => {
	if (localStorage.getItem("profile")) {
		req.headers.authorization = `Bearer ${
			JSON.parse(localStorage.getItem("profile")).token
		}`;
	}

	return req;
});

export const signIn = (formData) => API.post("/api/v1/auth/signin", formData);
