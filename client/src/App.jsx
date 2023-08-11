import "./App.css";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./common/PrivateRoute";
import Dashboard from "./components/dashboard/Index";
import AddPurchase from "./components/store-keeper/purchase/AddPurchase";
import VerifyPurchase from "./components/admin/verify-purchase/VerifyPurchase";
import ManageUsers from "./components/admin/users/ManageUsers";
import TextbookSalesTracking from "./components/admin/reports/TextBookSalesTracking";
import Login from "./components/login/Login";
import Main from "./components/dashboard/Main";

function App() {
	return (
		<Routes>
			<Route path='/' element={<Login />} />
			<Route
				path='/dashboard'
				element={
					<PrivateRoute>
						<Dashboard />
					</PrivateRoute>
				}>
				<Route index element={<Main />}></Route>

				<Route path='add-purchase' element={<AddPurchase />}></Route>
				<Route path='verify' element={<VerifyPurchase />}></Route>
				<Route path='users' element={<ManageUsers />}></Route>
				<Route path='sales-report' element={<TextbookSalesTracking />}></Route>
			</Route>
		</Routes>
	);
}

export default App;
