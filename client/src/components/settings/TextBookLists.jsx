import React, { useState } from "react";
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	Table,
	TableContainer,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const TextbookLists = ({ textbooks, handleDelete }) => {
	const [expanded, setExpanded] = useState(false);

	const handleAccordionChange = () => {
		setExpanded(!expanded);
	};

	return (
		<Accordion expanded={expanded} onChange={handleAccordionChange}>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls='panel1a-content'
				id='panel1a-header'>
				<Typography variant='h6'>Textbooks Management</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell>Price</TableCell>
								<TableCell>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{textbooks.map((textbook) => (
								<TableRow key={textbook._id}>
									<TableCell>{textbook.name}</TableCell>
									<TableCell>{textbook.price}</TableCell>
									<TableCell>
										<IconButton aria-label='edit'>
											<EditIcon />
										</IconButton>
										<IconButton aria-label='delete'>
											<DeleteIcon onClick={() => handleDelete(textbook._id)} />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</AccordionDetails>
		</Accordion>
	);
};

export default TextbookLists;
