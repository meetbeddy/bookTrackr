import { useState, useEffect } from "react";
import { useLocation, Link, NavLink } from "react-router-dom";
import NavItem from "./NavItem";
import navigationConfig from "../../config/navigationConfig";

const NavBar = () => {
	const location = useLocation();
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem("profile")));
	}, [location]);

	return (
		<div>
			<nav className='navbar'>
				<ul className='navbar-nav'>
					<li className='logo'>
						<a href='/dashboard' className='nav-link'>
							<span className='link-text logo-text'>
								<img
									style={{ width: "50px" }}
									src='/assets/images/bookTracker-logo.jpg'
									alt='arc-invoice'
								/>
							</span>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
								className='feather feather-arrow-right'>
								<line x1='5' y1='12' x2='19' y2='12'></line>
								<polyline points='12 5 19 12 12 19'></polyline>
							</svg>
						</a>
					</li>
					{navigationConfig.map((item) => {
						if (item.role.includes(user.user?.role)) {
							return (
								<NavItem
									key={item.id}
									icon={item.icon}
									url={item.url}
									title={item.title}
								/>
							);
						}
						return null;
					})}

					<li className='nav-item' id='themeButton'>
						<NavLink to='/dashboard/settings' className='nav-link'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
								className='feather feather-settings'>
								<circle cx='12' cy='12' r='3'></circle>
								<path d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z'></path>
							</svg>
							<span className='link-text'>Settings</span>
						</NavLink>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default NavBar;
