import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/v1" });
// const API = axios.create({ baseURL: process.env.REACT_APP_API})

API.interceptors.request.use((req) => {
	if (localStorage.getItem("profile")) {
		req.headers.authorization = `Bearer ${
			JSON.parse(localStorage.getItem("profile")).token
		}`;
	}

	return req;
});

export const signIn = (formData) => API.post("/auth/signin", formData);
export const createUser = (formData) => API.post("/admin/createuser", formData);
export const getUsers = () => API.get("/admin/getusers");
export const deleteUser = (id) => API.delete(`/admin/deleteuser/${id}`);

export const createPurchase = (data) => API.post("/purchase/addpuchase", data);

export const fetchTextbooks = () => API.get("/admin/gettextbook");

export const verifyPurchase = (id) => API.get(`/purchase/verifypurchase/${id}`);
