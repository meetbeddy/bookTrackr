import React, { useState, useEffect } from "react";
import { Button, Container, Typography } from "@mui/material";
import UserForm from "./UserForm";
import UserList from "./UserList";
import { useDispatch, useSelector } from "react-redux";
import {
	createuser,
	deleteUser,
	getUsers,
} from "../../../actions/adminActions";
import Swal from "sweetalert2";

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
		dispatch(createuser(data, Swal));

		closeModal();
	};

	const handleDelete = (id) => {
		Swal.fire({
			title: "Delete User",
			text: `Are you sure you want to delete this user?`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#d33",
			cancelButtonColor: "#3085d6",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(deleteUser(id, Swal));
			}
		});
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
			<UserList users={users} onDelete={handleDelete} />
			<UserForm
				open={isModalOpen}
				onClose={closeModal}
				onSubmit={handleUserSubmit}
			/>
		</Container>
	);
};

export default ManageUsers;
