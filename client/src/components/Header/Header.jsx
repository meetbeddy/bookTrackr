import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Avatar from "@mui/material/Avatar";
import styles from "./Header.module.css";

const RootDiv = styled("div")({
	display: "flex",
});

const AvatarButton = styled(Button)(({ theme }) => ({
	marginRight: theme.spacing(2),
}));

const PaperElevated = styled(Paper)({
	elevation: 3,
});

const Header = () => {
	const dispatch = useDispatch();
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem("profile")));
	}, [location]);

	const logout = () => {
		dispatch({ type: "LOGOUT" });
		navigate("/");
		setUser(null);
	};

	useEffect(() => {
		const token = user?.token;

		if (token) {
			const decodedToken = decode(token);
			if (decodedToken.exp * 1000 < new Date().getTime()) logout();
		}
	}, [location, user]);

	const [open, setOpen] = useState(false);
	const anchorRef = useRef(null);

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

	const openLink = (link) => {
		navigate(`/${link}`);
		setOpen(false);
	};

	const handleListKeyDown = (event) => {
		if (event.key === "Tab") {
			event.preventDefault();
			setOpen(false);
		}
	};

	const prevOpen = useRef(open);
	useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		}

		prevOpen.current = open;
	}, [open]);

	if (!user) {
		return (
			<div className={styles.header2}>
				<img
					style={{ width: "50px", cursor: "pointer" }}
					onClick={() => navigate("/")}
					src='/assets/images/bookTracker-logo.jpg'
					alt='arc-invoice'
				/>
				<button onClick={() => navigate("/")} className={styles.login}>
					Get started
				</button>
			</div>
		);
	}

	return (
		<div className={styles.header}>
			<RootDiv>
				<div>
					<AvatarButton
						ref={anchorRef}
						aria-controls={open ? "menu-list-grow" : undefined}
						aria-haspopup='true'
						onClick={handleToggle}>
						<Avatar style={{ backgroundColor: "#1976D2" }}>
							{user?.user?.firstName?.charAt(0)}
						</Avatar>
					</AvatarButton>
					<Popper
						open={open}
						anchorEl={anchorRef.current}
						role={undefined}
						transition
						disablePortal>
						{({ TransitionProps, placement }) => (
							<Grow
								{...TransitionProps}
								style={{
									transformOrigin:
										placement === "bottom" ? "center top" : "center bottom",
								}}>
								<PaperElevated>
									<ClickAwayListener onClickAway={handleClose}>
										<MenuList
											autoFocusItem={open}
											id='menu-list-grow'
											onKeyDown={handleListKeyDown}>
											<MenuItem onClick={() => openLink("settings")}>
												Settings
											</MenuItem>
											<MenuItem onClick={() => logout()}>Logout</MenuItem>
										</MenuList>
									</ClickAwayListener>
								</PaperElevated>
							</Grow>
						)}
					</Popper>
				</div>
			</RootDiv>
		</div>
	);
};

export default Header;
