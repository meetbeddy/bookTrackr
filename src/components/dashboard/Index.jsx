import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";

function Index(props) {
	return (
		<div className='w-full  flex flex-col min-h-screen'>
			<Header />
			<NavBar />

			<main
				id='app-main'
				className='flex flex-col flex-auto min-h-full min-w-0 relative z-10'>
				<div className='flex flex-col flex-auto min-h-0 relative z-10'>
					<Outlet />

					{props.children}
				</div>
			</main>

			<Footer />
		</div>
	);
}

export default Index;
