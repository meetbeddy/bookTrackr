import React from "react";
import { TableCell, TableRow, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const UserListItem = ({ user, onDelete }) => {
	return (
		<TableRow>
			<TableCell>
				{user.firstName} {user.lastName}
			</TableCell>
			<TableCell>{user.email}</TableCell>
			<TableCell>{user.phone}</TableCell>
			<TableCell>{user.role}</TableCell>
			<TableCell>
				<IconButton onClick={() => onDelete(user.id)}>
					<DeleteIcon />
				</IconButton>
			</TableCell>
		</TableRow>
	);
};

export default UserListItem;
