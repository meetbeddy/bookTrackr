import React, { useState } from "react";
import {
	Container,
	Typography,
	Paper,
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	MenuItem,
	Button,
	TextField,
	Grid,
} from "@mui/material";

const TextbookSalesTracking = () => {
	const [salesData, setSalesData] = useState([
		{
			id: 1,
			date: "2023-08-15",
			textbook: "COS 101",
			quantitySold: 25,
			revenue: 750.0,
		},
		{
			id: 2,
			date: "2023-08-16",
			textbook: "COS 301",
			quantitySold: 18,
			revenue: 540.0,
		},
	]);
	const [dateRangeFilter, setDateRangeFilter] = useState({});
	const [textbookFilter, setTextbookFilter] = useState("");

	const handleDateToChange = (event) => {
		setDateRangeFilter({ ...dateRangeFilter, to: event.target.value });
	};

	const handleTextbookFilterChange = (event) => {
		setTextbookFilter(event.target.value);
	};

	const generateReport = () => {
		// Logic to generate sales report based on selected criteria
	};

	// Fetch sales data or set it manually
	// const fetchSalesData = () => {
	//   // Fetch sales data from the backend or set it manually
	//   const fetchedSalesData = ...;
	//   setSalesData(fetchedSalesData);
	// };

	// useEffect(fetchSalesData, []); // Fetch sales data on component mount

	return (
		<Container>
			<Typography variant='h4' gutterBottom>
				Textbook Sales Tracking
			</Typography>

			<Paper elevation={3} sx={{ padding: 2 }}>
				<Grid container spacing={2} className='m-6'>
					<Grid item xs={12} sm={4}>
						<TextField
							label='From Date'
							type='date'
							value={dateRangeFilter.from || ""}
							onChange={(e) =>
								setDateRangeFilter({ ...dateRangeFilter, from: e.target.value })
							}
							InputLabelProps={{
								shrink: true,
							}}
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<TextField
							label='To Date'
							type='date'
							value={dateRangeFilter.to || ""}
							onChange={handleDateToChange}
							InputLabelProps={{
								shrink: true,
							}}
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<TextField
							label='Textbook Filter'
							value={textbookFilter}
							onChange={handleTextbookFilterChange}
							select
							fullWidth>
							<MenuItem value='' disabled>
								Select Textbook
							</MenuItem>
							<MenuItem value='COS 101'>COS 101</MenuItem>
							<MenuItem value='COS 301'>COS 301</MenuItem>
						</TextField>
					</Grid>
				</Grid>
				<div className='m-4'>
					<Button variant='contained' color='primary' onClick={generateReport}>
						Generate Report
					</Button>
				</div>

				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Date</TableCell>
								<TableCell>Textbook</TableCell>
								<TableCell>Quantity Sold</TableCell>
								<TableCell>Revenue</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{salesData.map((sale) => (
								<TableRow key={sale.id}>
									<TableCell>{sale.date}</TableCell>
									<TableCell>{sale.textbook}</TableCell>
									<TableCell>{sale.quantitySold}</TableCell>
									<TableCell>{sale.revenue}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</Container>
	);
};

export default TextbookSalesTracking;
