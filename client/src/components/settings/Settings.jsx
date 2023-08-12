import React, { useState, useEffect } from "react";
import AddTextBook from "./AddTextBook";
import FabButton from "../utils/Fab";
import { Container } from "@mui/material";
import {
	createtextbook,
	deleteTextbook,
	gettextbook,
} from "../../actions/adminActions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import TextbookLists from "./TextBookLists";
import Empty from "../utils/Empty";

function Settings() {
	const [isModalOpen, setModalOpen] = useState(false);
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
	// const [users, setUsers] = useState();

	const textbooks = useSelector((state) => state.admin.textbooks);

	console.log(textbooks);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(gettextbook());
	}, [dispatch]);
	const openModal = () => {
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
	};

	const handleSubmit = (data) => {
		dispatch(createtextbook(data, Swal));

		closeModal();
	};

	const handleDelete = (id) => {
		Swal.fire({
			title: "Delete Textbook",
			text: `Are you sure you want to delete this textbook?`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#d33",
			cancelButtonColor: "#3085d6",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(deleteTextbook(id, Swal));
			}
		});
	};
	if (user.user.role !== "admin") return <Empty />;
	return (
		<Container>
			<TextbookLists textbooks={textbooks} handleDelete={handleDelete} />
			<AddTextBook
				open={isModalOpen}
				onClose={closeModal}
				onSubmit={handleSubmit}
			/>

			<FabButton addTextbook={openModal} />
		</Container>
	);
}

export default Settings;
