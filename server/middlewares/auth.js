import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const isCustomAuth = token.length < 500;

		let decodedData;

		if (token && isCustomAuth) {
			decodedData = jwt.verify(token, process.env.JWT_SECRET);

			req.userId = decodedData?.id;
			req.role = decodedData?.role;
			req.token = token;
		} else {
			decodedData = jwt.decode(token);

			req.userId = decodedData?.sub;
			req.token = token;
			req.role = decodedData?.role;
		}

		next();
	} catch (error) {
		res.status(401).json({ message: "token expired please log in again" });
	}
};

export default auth;
