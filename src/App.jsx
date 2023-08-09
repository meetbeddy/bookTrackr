import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Index";

function App() {
	return (
		<Routes>
			<Route path='/dashboard' element={<Dashboard />}>
				<Route
					index
					element={
						<h1>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit.
							Praesentium, ea autem. Minus ducimus dicta totam tempore veniam at
							voluptatum eos, quam, enim quaerat nulla ipsam? Veniam fuga nemo
							voluptatibus est.
						</h1>
					}></Route>
			</Route>
		</Routes>
	);
}

export default App;