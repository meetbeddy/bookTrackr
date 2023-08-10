import React, { useState, useEffect } from "react";
import { Button, Container, Typography } from "@mui/material";
import UserForm from "./UserForm";
import UserList from "./UserList";
import { useDispatch, useSelector } from "react-redux";
import { createuser, getUsers } from "../../../actions/adminActions";

import fakeUserList from "../../../data";

const ManageUsers = () => {
	const [isModalOpen, setModalOpen] = useState(false);
	// const [users, setUsers] = useState();

	const users = useSelector((state) => state.admin.users);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);
	const openModal = () => {
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
	};

	const handleUserSubmit = (data) => {
		console.log(data);
		dispatch(createuser(data));

		closeModal();
	};

	return (
		<Container>
			<div className='flex-1 px-6 md:px-16 py-4 flex items-center justify-between'>
				{" "}
				<Typography variant='h4' gutterBottom>
					Manage Users
				</Typography>
				<Button variant='contained' color='primary' onClick={openModal}>
					Add User
				</Button>
			</div>
			<UserList users={users} />
			<UserForm
				open={isModalOpen}
				onClose={closeModal}
				onSubmit={handleUserSubmit}
			/>
		</Container>
	);
};

export default ManageUsers;
