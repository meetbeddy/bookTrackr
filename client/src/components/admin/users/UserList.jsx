import React from "react";
import {
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Paper,
	Typography,
} from "@mui/material";
import UserListItem from "./UserListItem";

const UserList = ({ users, onDelete }) => {
	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>Email</TableCell>
						<TableCell>Phone Number</TableCell>
						<TableCell>Role</TableCell>
						<TableCell>Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{!users || users?.length === 0 ? (
						<TableRow>
							<TableCell colSpan={5}>
								<Typography variant='subtitle1'>
									No users to display.
								</Typography>
							</TableCell>
						</TableRow>
					) : (
						users &&
						users?.map((user) => (
							<UserListItem key={user._id} user={user} onDelete={onDelete} />
						))
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default UserList;
