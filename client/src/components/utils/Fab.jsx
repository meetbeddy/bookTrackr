import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Fab, Action } from "react-tiny-fab";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import "react-tiny-fab/dist/styles.css";

const FabButton = ({ addTextbook }) => {
	const location = useLocation();
	const mainButtonStyles = { backgroundColor: "#1976D2" };
	const [open, setOpen] = useState(false);

	return (
		<div>
			<Fab
				mainButtonStyles={mainButtonStyles}
				icon={<AddIcon />}
				alwaysShowTitle={true}>
				<Action text='add textbook' onClick={addTextbook}>
					<CreateIcon />
				</Action>
				<Action text='Help'>
					<PersonAddIcon />
				</Action>
			</Fab>
		</div>
	);
};

export default FabButton;
