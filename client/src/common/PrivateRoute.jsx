import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			navigate("/");
		}
	}, [navigate, user]);

	if (!user) {
		return null;
	}

	return <>{children}</>;
};

export default PrivateRoute;
